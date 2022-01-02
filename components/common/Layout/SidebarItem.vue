<template>
  <!-- <auth :allow="component.permission || ['ALL']"> -->
  <el-tooltip
    effect="dark"
    :content="$t('sidebar.' + component.module)"
    placement="right"
    :disabled="!sidebarCollapsed"
  >
    <li
      class="mb-5 flex cursor-pointer bg-gray-100 duration-300 hover:bg-success-200 hover:text-success"
      :class="{
        'bg-success-200 text-success':
          $route.path.split('/')[2] === component.route.name,
        'p-3': !sidebarCollapsed,
        'py-3 px-2': sidebarCollapsed,
      }"
      style="border-radius: 15px"
      @click="
        $router.push({
          name: `${roleGroup}-${component.route.name}`,
        })
      "
    >
      <span class="mx-1">
        <fa :icon="component.icon" />
      </span>
      <span
        class="whitespace-no-wrap ml-1 font-medium"
        :style="{
          opacity: sidebarCollapsed ? '0' : '1',
        }"
      >
        {{ $t('sidebar.' + component.module) }}
      </span>
    </li>
  </el-tooltip>
  <!-- </auth> -->
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    component: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.options.sidebarCollapsed,
      safeModeOn: (state) => state.options.safeModeOn,
    }),
    roleGroup() {
      return this.$store.getters['auth/roleGroup']
    },
  },
}
</script>
