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
            class="mt-8 mx-auto cursor-pointer"
            style="height: 60px"
            @click="$router.push(`/${roleGroup}`)"
          />
        </li>
        <SidebarItem
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
import SidebarItem from './SidebarItem'
import { sidebar } from '~/constants/config/base/sidebar'
import auth from '~/middleware/auth'
export default {
  middleware: [auth],
  name: 'Sidebar',
  components: {
    SidebarItem,
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
      sidebarCollapsed: (state) => state.sidebarCollapsed,
    }),
  },
}
</script>
