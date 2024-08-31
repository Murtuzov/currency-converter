<template>
  <div id="content">
    <Header />
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Header from "@/components/header/index.vue";
import { useDefaultStore } from "@/stores/default";

const data = ref(null);

onMounted(() => {
  useDefaultStore().getExchangeRates();
});
</script>

<style lang="stylus">
@import "@/styles/style.styl";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

#app {
  min-height 100vh
  display flex
  justify-content flex-start
  align-items stretch
}

#content {
  width 100%
  display flex
  flex-direction column
}
</style>
