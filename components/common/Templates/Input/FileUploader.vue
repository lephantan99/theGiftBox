<template>
  <div>
    <transition name="slide-fade">
      <span
        v-if="!limitExceeded"
        class="block"
        @click="
          () => {
            if (!disabled) triggerFileDialog()
          }
        "
      >
        <slot name="trigger">
          <el-button
            type="success"
            size="mini"
            :disabled="disabled"
            class="rounded-md"
          >
            <fa :icon="['fas', 'upload']" class="mr-1" />
            <span> {{ $t('uploader.upload') }} </span>
          </el-button>
        </slot>
      </span>
    </transition>
    <div v-if="preview" class="mt-2">
      <transition-group tag="div" name="list-complete">
        <div
          v-for="file in fileList"
          :key="file.url"
          class="list-complete-item"
        >
          <div class="relative">
            <slot name="preview" :file="file">
              <div class="my-1 border-box">
                <el-image
                  class="rounded-lg"
                  style="width: 80px; height: 60px"
                  :src="file.url"
                  :preview-src-list="[file.url]"
                  fit="cover"
                />
              </div>
            </slot>
            <fa
              :icon="['fas', 'times-circle']"
              class="text-danger hover:text-danger-700 cursor-pointer absolute top-0 right-0"
              style="transform: translate(50%, -50%)"
              @click="handleFileRemove(file)"
            />
          </div>
        </div>
      </transition-group>
    </div>
    <input
      ref="fileInput"
      style="display: none"
      type="file"
      :multiple="multiple"
      :accept="accept"
      @change="handleFileChange"
    />
  </div>
</template>
<script>
// import { random } from '~/utils/functions/random'
// eslint-disable-next-line no-unused-vars
import { different } from 'lodash'
const reader = new FileReader()
export default {
  model: {
    prop: 'fileList',
    event: 'my-uploader-change',
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    fileList: Array,
    multiple: {
      type: Boolean,
      default: false,
    },
    originalFileList: {
      type: Array,
      default: () => [],
    },
    /**
     * For multiple files picking
     */
    limit: {
      type: Number,
      default: 5,
    },
    /**
     * Max file size
     */
    maxSize: {
      type: Number,
      default: 2,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: 'image/png, image/jpeg',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    actualMaxSize() {
      return this.maxSize * 1024 * 1024
    },
    limitExceeded() {
      return this.fileList?.length >= this.limit
    },
    listIsEmpty() {
      return this.fileList?.length > 0
    },
  },
  created() {
    reader.addEventListener(
      'load',
      () => {
        return reader.result
      },
      false
    )
  },
  mounted() {},
  methods: {
    triggerFileDialog() {
      this.$emit('my-uploader-trigger')
      this.$refs.fileInput.click()
    },
    readFileTo64Async(file) {
      const base64String = new Promise((resolve) => {
        reader.addEventListener(
          'load',
          (event) => {
            resolve(event.target.result)
          },
          false
        )
      })
      reader.readAsDataURL(file)
      return base64String
    },
    handleFileRemove(removed) {
      this.$emit(
        'my-uploader-change',
        this.fileList.filter((file) => file !== removed)
      )

      const isOriginalFile = this.originalFileList?.find(
        (el) => el?.link?.origin === removed.url
      )
      this.$emit('on-image-removed', isOriginalFile)
    },
    async handleFileChange(event) {
      try {
        let fileArr = await Promise.all(
          Array.from(event.target.files).map(async (file) => {
            if (file.size < this.actualMaxSize) {
              if (this.accept.includes(file.type) || this.accept === '*') {
                /**
                 * Return a helpful object instead of a File object
                 *
                 * Only read the file into base64 string when enable preview mode
                 * because base64 is easier to handle
                 *
                 * There's a uid get from the blob url, use that for unique key binding or whatever
                 */
                const blobUrl = URL.createObjectURL(file)
                const fileObj = {
                  raw: file,
                  fileName: file.name,
                  mimeType: file.type,
                  url: blobUrl,
                  uid: blobUrl.split('/').pop(),
                }

                this.$emit('on-image-chose-form-local')

                return this.preview // Read the file into base64 string when enable preview
                  ? {
                      ...fileObj,
                      src: await this.readFileTo64Async(file),
                    }
                  : fileObj
              } else {
                this.$message.error(
                  `${this.$t('error.FILE_FORMAT')} ${file.type}`
                )
              }
            } else {
              this.$message.error(
                `${this.$t('error.MAX_FILE_SIZE')} ${this.maxSize}Mb`
              )
            }
          })
        )

        fileArr = fileArr.filter((item) => item) // Only return item that has value
        if (this.fileList) {
          this.$emit('my-uploader-change', [...this.fileList, ...fileArr])
        } else {
          this.$emit('my-uploader-change', fileArr)
        }
        // Clear the input fields
        // This will not trigger handleFileChange because input can't track this action for @change
        this.$refs.fileInput.value = ''
      } catch (err) {
        this.$dev.error(err)
      }
    },
  },
}
</script>
<style lang="scss">
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
