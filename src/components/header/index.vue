<template>
  <header class="header">
    <nav class="header__nav">
      <router-link :to="{ name: 'home' }">Главная</router-link>
      <router-link :to="{ name: 'convert' }">Конвертация</router-link>
    </nav>
    <SelectComponent
      v-model="defaultCurrency"
      @update:modelValue="changeDefaultCurrency"
      :options="currencies"
      label-name="title"
      class="header__currencies-list"
    />
  </header>
</template>

<script setup>
import { useDefaultStore } from "@/stores/default";
import SelectComponent from "@/components/inputs/select/input.vue";
import { ref } from "vue";

const store = useDefaultStore();
const currencies = useDefaultStore().currencies;

const defaultCurrency = ref(store.default_currency);

const changeDefaultCurrency = (data) => {
  useDefaultStore().default_currency = data;
  localStorage.setItem("defaultCurrency", JSON.stringify(data));
};
</script>

<style lang="stylus">
.header {
  padding: 0 30px
  width 100%
  height var(--header-height)
  //height 80px
  background var(--white)
  display: flex;
  justify-content space-between
  align-items center

  &__nav {
    display flex
    gap 30px
    align-items center
    font-size: 1.125rem
  }

  &__currencies-list {
    max-width 100px
  }
}
</style>
