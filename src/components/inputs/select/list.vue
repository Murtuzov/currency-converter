<template>
  <ul class="select-list">
    <template v-if="filteredOptions.length">
      <li
        v-for="(o, i) in filteredOptions"
        :key="i"
        class="select-list__item"
        :class="{ 'select-list__item--active': isChecked(o) }"
      >
        <CheckboxComponent @update:model-value="toggle(o)" :modelValue="isChecked(o)" v-if="multiple">
          <span>{{ getOptionTitle(o) }}</span>
        </CheckboxComponent>
        <button type="button" @click.prevent="toggle(o)" v-else>
          <slot :i="i" :item="o">
            {{ getOptionTitle(o) }}
          </slot>
        </button>
      </li>
    </template>
    <li v-else class="select-list__empty">Empty</li>
  </ul>
</template>

<script>
import CheckboxComponent from "@/components/inputs/CheckboxComponent.vue";

export default {
  name: "SelectListComponent",
  emits: ["update:model-value"],
  props: {
    labelName: {
      type: [String, Array],
      default: "title",
    },
    query: {
      type: String,
      default: "",
    },
    modelValue: [Array, Object],
    options: { type: Array, required: true },
    multiple: Boolean,
  },
  computed: {
    filteredOptions() {
      return this.options.filter((o) =>
        this.getOptionTitle(o).toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
  methods: {
    isChecked(option) {
      if (this.multiple) {
        return this.modelValue.map((s) => JSON.stringify(s)).includes(JSON.stringify(option));
      } else {
        return JSON.stringify(option) === JSON.stringify(this.modelValue);
      }
    },
    toggle(o) {
      if (!this.disabled) {
        if (this.multiple) {
          let array = JSON.parse(JSON.stringify(this.modelValue));
          if (this.isChecked(o)) {
            let indexOfSelected = this.modelValue.findIndex((v) => JSON.stringify(v) === JSON.stringify(o));
            array.splice(indexOfSelected, 1);
          } else {
            array.push(o);
          }
          this.$emit("update:model-value", array);
        } else {
          this.$emit("update:model-value", o);
        }
      }
    },
    getOptionTitle(option) {
      if (Array.isArray(this.labelName)) {
        return `${option[this.labelName[0]]} ${option[this.labelName[1]]}`;
      }
      return `${option[this.labelName]}`;
    },
  },
  components: { CheckboxComponent },
};
</script>

<style lang="stylus">
.select-list {
  background: var(--white);
  border-radius: 12px;
  background: var(--neutral-ffffff, #FFF);
  box-shadow: 0 4px 12px 0 rgba(60, 99, 198, 0.16);
  display flex
  flex-direction column
  align-items start
  overflow auto
  padding 2px 4px
  scrollbar-width thin
  scrollbar-color rgba(0, 0, 0, 0.3) transparent

  &::-webkit-scrollbar {
    width 8px
    height 8px
  }

  &::-webkit-scrollbar-track {
    background transparent
  }

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color rgba(0, 0, 0, 0.3)
    border-radius 3px
    border none
  }

  &__item {
    display inline-flex
    align-items center
    justify-content stretch
    width 100%
    height 100%

    &--active& {
      button {
        background: var(--corporate-dee-3-f-6, #E7EAF5);
        color: var(--corporate-4560-a-5, #3C63C6);
      }
    }

    .checkbox,
    button {
      padding 10px 12px
      transition background .2s
      background none
      border none
      width 100%
      color: var(--neutral-3-f-4144, #3F4144);
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 120% /* 16.8px */;
      text-align left
      min-height 18px
      border-radius: 8px;

      &:hover {
        background: var(--corporate-dee-3-f-6, #E7EAF5);
        color: var(--corporate-4560-a-5, #3C63C6);
      }

      &__field {
        gap 5px
        align-items center
        padding 5px 10px
      }
    }

    .checkbox {
      padding 0
    }
  }

  &__empty {
    overflow: hidden;
    color: var(--neutral-3-f-4144, #3F4144);
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem
    font-weight: 400;
    line-height: 120%; /* 16.8px */
    padding 10px 12px
  }
}
</style>
