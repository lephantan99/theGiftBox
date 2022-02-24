<template>
  <div
    class="relative rounded-lg overflow-hidden"
    style="width: 140px; height: 140px"
  >
    <el-image
      class="w-full h-full"
      :preview-src-list="preview ? preview : imageList"
      :src="thumbnail ? thumbnail : $e(imageList, '[0]')"
      fit="cover"
      lazy
    >
      <div
        slot="error"
        class="h-full bg-gray-100 flex items-center justify-center"
      >
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <el-button
      size="small"
      :type="thumbnail ? 'warning' : 'success'"
      class="absolute top-0 right-0"
      style="transform: translate(-50%, 50%)"
      circle
      @click="triggerMediaPickerDialog"
    >
      <fa :icon="['fas', thumbnail ? 'edit' : 'plus']" />
    </el-button>
    <el-button
      size="small"
      type="danger"
      class="absolute right-0"
      style="top: 3rem; transform: translate(-50%, 50%)"
      circle
      @click="$emit('my-media-picker-clear')"
    >
      <fa :icon="['fas', 'times-circle']" />
    </el-button>
    <MediaPickerDialog
      id="image-picker"
      ref="mediaPickerDialog"
      :type="type"
      @my-media-picker-dialog-selected="handleMediaPickerDialogSelected"
    />
  </div>
</template>
<script>
import { MediaPickerDialog } from '~templates/Media'
export default {
  components: {
    MediaPickerDialog,
  },
  model: {
    event: 'my-media-picker-selected',
    prop: 'imageList',
  },
  props: {
    thumbnail: {
      type: String,
      required: true,
    },
    preview: {
      type: Array,
      required: true,
    },
    // eslint-disable-next-line vue/require-default-prop
    imageList: {
      type: Array,
    },
    type: {
      type: String,
      default: 'OTHER',
      validator(val) {
        return ['BILL', 'DRINK', 'DISH', 'SERVICE', 'DEVICE', 'OTHER'].includes(
          val
        )
      },
    },
  },
  methods: {
    triggerMediaPickerDialog() {
      this.$refs.mediaPickerDialog.show()
    },
    handleMediaPickerDialogSelected(pickedImages) {
      this.$emit('my-media-picker-selected', pickedImages)
    },
  },
}
</script>
