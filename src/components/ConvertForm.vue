<template>
  <form class="convert-form">
    <div class="convert-form__wrapper">
      <SelectComponent
        v-model="form.selectFirstCurrency.value"
        :options="currencies"
        @update:modelValue="handleFirstCurrency"
        label-name="title"
      />
      <InputComponent
        v-model="form.valueFirstCurrency.value"
        @update:modelValue="handleFirstCurrency"
        type="number"
      />
    </div>
    <div class="convert-form__wrapper">
      <SelectComponent
        v-model="form.selectSecondCurrency.value"
        :options="remainingCurrencies"
        @update:modelValue="handleSecondCurrency"
        label-name="title"
      />
      <InputComponent
        v-model="form.valueSecondCurrency.value"
        @update:modelValue="handleSecondCurrency"
        type="number"
      />
    </div>
  </form>
</template>

<script setup>
import InputComponent from "@/components/inputs/InputComponent.vue";
import SelectComponent from "@/components/inputs/select/input.vue";
import { computed, reactive } from "vue";
import { useDefaultStore } from "@/stores/default";

const currencies = useDefaultStore().currencies;

const form = reactive({
  selectFirstCurrency: {
    value: useDefaultStore().default_currency,
    errors: [],
  },
  selectSecondCurrency: {
    value: currencies.filter((item) => item.current !== useDefaultStore().default_currency.current)[0],
    errors: [],
  },
  valueFirstCurrency: {
    value: null,
    errors: [],
  },
  valueSecondCurrency: {
    value: null,
    errors: [],
  },
});

const remainingCurrencies = computed(() =>
  currencies.filter((item) => item.current !== form.selectFirstCurrency.value.current)
);

const exchangeRates = computed(() => useDefaultStore().exchange_rates);

const exchangeRateValue = computed(() => {
  return exchangeRates.value[
    `${form.selectFirstCurrency.value.current.toLowerCase()}-${form.selectSecondCurrency.value.current.toLowerCase()}`
  ];
});

const handleFirstCurrency = () => {
  form.valueSecondCurrency.value = (form.valueFirstCurrency.value * exchangeRateValue.value).toFixed(2);
};

const handleSecondCurrency = () => {
  form.valueFirstCurrency.value = (form.valueSecondCurrency.value / exchangeRateValue.value).toFixed(2);
};
</script>

<style lang="stylus">
.convert-form {
  display flex
  flex-direction column
  gap 20px
  max-width 400px

  &__wrapper {
    display grid
    grid-template-columns 120px 1fr
    gap 12px
    align-items center
  }
}
</style>
