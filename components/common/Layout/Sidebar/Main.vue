<template>
  <div
    class="relative duration-300"
    :style="{
      width: sidebarCollapsed
        ? `${minWidth}px !important`
        : `${maxWidth}px !important`,
    }"
  >
    <el-aside
      class="duration-300 relative h-full w-full flex flex-col"
      :class="{ 'pl-2': sidebarCollapsed }"
      :style="{
        width: sidebarCollapsed
          ? `${minWidth}px !important`
          : `${maxWidth}px !important`,
      }"
    >
      <ul class="overflow-x-hidden overflow-y-scroll flex flex-col">
        <li class="text-center mb-10">
          <!--  -->
          <img
            src="~/assets/img/logo.png"
            alt="Minh Châu Việt logo"
            class="mt-8 mx-auto cursor-pointer"
            style="height: 60px"
            @click="$router.push(`/${roleGroup}`)"
          />
        </li>
        <SidebarGroupItem
          v-for="group in sidebar.groups"
          :key="group.name"
          :group="group"
        />
      </ul>
    </el-aside>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SidebarGroupItem from './SidebarGroupItem'
import { sidebar } from '~/constants/config/base/sidebar'
export default {
  name: 'Sidebar',
  components: {
    SidebarGroupItem,
  },
  props: {
    minWidth: {
      type: Number,
      default: 70,
    },
    maxWidth: {
      type: Number,
      default: 250,
    },
  },
  data() {
    return {
      sidebar,
    }
  },
  computed: {
    ...mapState({
      sidebarCollapsed: (state) => state.options.sidebarCollapsed,
    }),
    roleGroup() {
      return this.$store.getters['auth/roleGroup']
    },
  },
}
</script>
