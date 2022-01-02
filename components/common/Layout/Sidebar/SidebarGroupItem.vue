<template>
  <auth :allow="group.permission || ['ALL']">
    <li
      class="block duration-300 w-full text-gray-700"
      :class="[sidebarCollapsed ? 'p-1' : 'px-5 py-2']"
    >
      <span
        v-if="group.name"
        class="text-2xl mb-3 block duration-300 whitespace-no-wrap font-bold"
        :style="{
          opacity: sidebarCollapsed ? '0' : '1',
        }"
      >
        {{ $t('sidebar.' + group.name) }}
      </span>
      <ul class="duration-300">
        <SidebarItem
          v-for="component in group.components"
          :key="'sidebar-' + component.module"
          :component="component"
        />
      </ul>
    </li>
  </auth>
</template>
<script>
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem.vue'
export default {
  components: {
    SidebarItem,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.options.sidebarCollapsed,
    }),
  },
}
</script>
