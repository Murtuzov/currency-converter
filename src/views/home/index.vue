<template>
  <main class="page home-page">
    <CurrencyCard v-for="(item, i) in currencies" :key="i" :data="item" />
  </main>
</template>

<script setup>
import CurrencyCard from "@/components/CurrencyCard.vue";
import { useDefaultStore } from "@/stores/default";
import { computed } from "vue";

const defaultCurrency = computed(() => useDefaultStore().default_currency);

const currencies = computed(() =>
  useDefaultStore().currencies.filter((item) => item.current !== defaultCurrency.value.current)
);
</script>

<style lang="stylus">
.home-page {
  display grid
  grid-template-columns repeat(5, 1fr)
}
</style>
