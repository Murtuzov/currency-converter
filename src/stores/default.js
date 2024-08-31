import { defineStore } from "pinia";

export const useDefaultStore = defineStore({
  id: "default",
  state: () => ({
    // в title можно ввести что угодно, для удобства понимания вместо USD - доллар например
    currencies: [
      { title: "USD", current: "USD" },
      { title: "EUR", current: "EUR" },
      { title: "RUB", current: "RUB" },
    ],
    default_currency: JSON.parse(localStorage.getItem("defaultCurrency")) || { title: "USD", current: "USD" },
    exchange_rates: [],
  }),
  actions: {
    async getExchangeRates() {
      try {
        const data = await fetch("https://status.neuralgeneration.com/api/currency");
        this.exchange_rates = await data.json();
      } catch (error) {
        console.log("При получении актуального курса произошла ошибка");
      }
    },
  },
});
