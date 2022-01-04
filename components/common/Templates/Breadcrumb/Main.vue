<!-- eslint-disable prettier/prettier -->
<template>
  <h1 class="text-dark mb-3">
    <span
      v-if="isBack"
      class="text-2xl"
      @click="
        desRoute
          ? $router.push({
            name: `${$store.getters['auth/roleGroup']}-${desRoute}`,
          })
          : $router.go(-1)
      "
    >
      <fa class="mr-2 cursor-pointer" :icon="['fas', 'arrow-left']" />
    </span>
    <span class="text-3xl font-bold">
      {{ title }}
    </span>

    <fa
      class="ml-1 cursor-pointer"
      :icon="['fas', 'home']"
      @click="$router.push('/admin')"
    />
  </h1>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    desRoute: {
      type: String,
      required: false,
      default: null,
    },
    hasBackButton: {
      type: Boolean,
      default: false,
    },
    justGoBack: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isBack: false,
    }
  },
  created() {
    const { name } = this.$nuxt.context.from
    if (
      this.hasBackButton &&
      (this.$route.name !== name || this.desRoute || this.justGoBack)
    ) {
      this.isBack = true
    }
  },
}
</script>
