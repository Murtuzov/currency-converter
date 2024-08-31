<template>
  <div class="currency">
    <div class="currency__wrapper">1 {{ data.title }}</div>
    <div class="currency__wrapper">
      <span class="currency__value">{{ exchangeRateValue?.toFixed(2) }}</span> {{ defaultCurrency.title }}
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useDefaultStore } from "@/stores/default";

const props = defineProps({
  data: Object,
});

const defaultCurrency = computed(() => useDefaultStore().default_currency);
const exchangeRates = computed(() => useDefaultStore().exchange_rates);

const exchangeRateValue = computed(() => {
  return exchangeRates.value[
    `${props.data.current.toLowerCase()}-${defaultCurrency.value.current.toLowerCase()}`
  ];
});
</script>

<style lang="stylus">
.currency {
  width 300px
  height 120px
  background var(--white)
  border-radius 20px
  border 1px solid #DEE3F6
  padding: 20px
  display flex
  flex-direction column
  gap 20px

  &__value {
    font-size:2rem
    line-height: 30px
    text-align: left;
    color #3C63C6
    font-weight: 600
  }

  &__wrapper {

  }
}
</style>
