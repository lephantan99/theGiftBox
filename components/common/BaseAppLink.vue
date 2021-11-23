<template>
  <!-- Anywhere in your app
    <BaseAppLink :to="[external-or-internal-link]">Click Me</BaseAppLink> -->
  <a
    v-if="isExternal"
    :href="to"
    target="_blank"
    rel="noopener"
    class="external-link"
  >
    <slot />
    <i class="fas fa-external-link-alt ml-2" />
  </a>
  <router-link v-else class="internal-link" v-bind="$props">
    <slot />
  </router-link>
</template>

<script>
export default {
  name: 'BaseAppLink',
  props: {
    to: {
      type: [String, Object],
      default: null,
    },
  },
  computed: {
    isExternal() {
      return typeof this.to === 'string' && this.to.startsWith('http')
    },
  },
}
</script>

<style scoped>
.external-link i {
  font-size: 0.8em;
  opacity: 0.7;
}
.internal-link {
  @apply hover:text-primary;
}
</style>
