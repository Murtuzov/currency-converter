<template>
  <div
    class="input"
    :class="{
      'input--focused': focused,
      'input--error': errors.length,
      'input--disabled': disabled,
    }"
  >
    <label class="input__title" :for="id" v-if="title">
      {{ title }}
      <span v-if="required">*</span>
    </label>
    <div class="input__field" :class="{ 'input--column': subtitle }">
      <label class="input__field-label" :for="id" aria-hidden="true"></label>
      <span v-if="subtitle" class="input__subtitle"> {{ subtitle }}</span>
      <slot name="before"></slot>
      <input
        ref="input"
        :id="id"
        @input="$emit('update:model-value', $event.target.value)"
        :type="type"
        v-maska="mask"
        :value="modelValue"
        @keydown="$emit('keydown', $event)"
        @focus="focused = true"
        @blur="focused = false"
        :placeholder="placeholder"
        :disabled="disabled"
      />
      <slot name="after"></slot>
    </div>
    <div class="input__errors" v-if="errors.length">
      <span v-for="(error, i) in errors" :key="i">{{ error }}</span>
    </div>
    <div class="input__messages" v-if="messages.length">
      <span v-for="(message, i) in messages" :key="i">{{ message }}</span>
    </div>
  </div>
</template>

<script>
import { maska } from "maska";

const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

export default {
  name: "InputComponent",
  emits: ["update:model-value", "blur", "keydown"],
  props: {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    mask: {
      type: String,
    },
    modelValue: [String, Number],
    messages: {
      type: Array,
      default: () => [],
    },
    errors: {
      type: Array,
      default: () => [],
    },
    required: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.input.focus();
    }
  },
  data: () => ({
    id: uid(),
    focused: false,
  }),

  directives: {
    maska,
  },
};
</script>

<style lang="stylus">
@import "@/styles/parts/input.styl"
</style>
