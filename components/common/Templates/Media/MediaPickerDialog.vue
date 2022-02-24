<template>
  <DialogWrapper
    :id="id"
    ref="mediaPickerDialog"
    v-loading="isLoading"
    class="media-picker"
    :title="$t('media-picker.title')"
    :fullscreen="true"
    @my-dialog-on="fetchImages"
    @my-dialog-off="clearImageDialog"
  >
    <div class="flex">
      <div class="flex-1 p-8">
        <div class="w-full pb-8 text-right">
          <FileUploader v-model="fileList" :multiple="true" />
        </div>
        <!-- Picked file from the computer -->
        <transition name="el-zoom-in-top">
          <div
            v-if="fileList ? fileList.length > 0 : false"
            class="bg-gray-100 p-5 rounded-lg mb-5"
          >
            <div class="font-bold mb-3 flex justify-between">
              <span>
                <!--  -->
                Picked files from computer
              </span>
              <el-button type="success" size="mini" @click="uploadFile">
                {{ 'Upload files' }}
              </el-button>
            </div>
            <!-- Preview item -->
            <div
              v-for="(file, index) in fileList"
              :key="'file-' + file.uid"
              class="inline-block relative mr-3 cursor-pointer duration-150"
            >
              <el-image
                class="rounded-lg"
                style="width: 80px; height: 50px"
                :src="file.url"
                fit="cover"
                :preview-src-list="
                  fileList.map((previewedFile) => previewedFile.url)
                "
              />
              <fa
                class="absolute top-0 right-0 hover:text-danger duration-300"
                style="transform: translate(50%, -50%)"
                :icon="['fas', 'times-circle']"
                @click="fileList.splice(index, 1)"
              />
            </div>
          </div>
        </transition>
        <transition name="el-zoom-in-top">
          <div
            v-if="pickedList.length > 0"
            class="bg-gray-100 p-5 rounded-lg mb-5"
          >
            <div class="font-bold mb-3 flex justify-between">
              <span>
                <!--  -->
                Selected files
              </span>
              <el-button
                type="success"
                size="mini"
                @click="onDoneSelectingFiles"
              >
                {{ 'Done picking files' }}
              </el-button>
            </div>
            <!-- Preview selected item -->
            <div
              v-for="(image, index) in pickedList"
              :key="image.fileName + index"
              class="inline-block relative mr-3 cursor-pointer duration-150"
            >
              <el-image
                class="rounded-lg"
                style="width: 80px; height: 50px"
                :src="image.links.thumbnail"
                fit="cover"
                :preview-src-list="
                  pickedList.map(
                    (previewedImage) => previewedImage.links.origin
                  )
                "
              />
              <fa
                class="absolute top-0 right-0 hover:text-danger duration-300"
                style="transform: translate(50%, -50%)"
                :icon="['fas', 'times-circle']"
                @click="pickedList.splice(index, 1)"
              />
            </div>
          </div>
        </transition>
        <el-table :data="images" border style="width: 100%">
          <el-table-column :label="$t('table.preview')" width="200">
            <template slot-scope="scope">
              <el-image
                :preview-src-list="[
                  `${baseImageURL}/${scope.row.links.origin}`,
                ]"
                :src="`${baseImageURL}/${scope.row.links.thumbnail}`"
                :alt="scope.row.fileName"
                fit="cover"
                lazy
                style="width: 180px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.info')">
            <template slot-scope="scope">
              <div class="text-left">
                <p>
                  <fa :icon="['fas', 'image']" class="text-success mr-1" />
                  <span>File name: {{ scope.row.fileName }}</span>
                </p>
                <p>
                  <fa :icon="['fas', 'link']" class="text-info mr-1" />
                  <span>Thumbnail size:</span>
                  <span
                    v-clip.pointer="'Click to copy URL'"
                    class="hover:text-success duration-300 overflow-hidden inline-block w-56 h-4"
                  >
                    {{ `${baseImageURL}/${scope.row.links.thumbnail}` }}
                  </span>
                </p>
                <p>
                  <fa :icon="['fas', 'link']" class="text-info mr-1" />
                  <span>Medium size:</span>
                  <span
                    v-clip.pointer="'Click to copy URL'"
                    class="hover:text-success duration-300 overflow-hidden inline-block w-56 h-4"
                  >
                    {{ `${baseImageURL}/${scope.row.links.medium}` }}
                  </span>
                </p>
                <p>
                  <fa :icon="['fas', 'link']" class="text-info mr-1" />
                  <span>Original size:</span>
                  <span
                    v-clip.pointer="'Click to copy URL'"
                    class="hover:text-success duration-300 overflow-hidden inline-block w-56 h-4"
                  >
                    {{ `${baseImageURL}/${scope.row.links.origin}` }}
                  </span>
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('table.actions')">
            <template slot-scope="scope">
              <el-button
                type="success"
                size="mini"
                @click="handleImageSelect(scope.row)"
              >
                <fa :icon="['fas', 'check']" />
                <span class="ml-3">
                  {{ $t('media-picker.select') }}
                </span>
              </el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleImageDelete(scope.row.id)"
              >
                <fa :icon="['fas', 'trash-alt']" />
                <span class="ml-3">
                  {{ $t('media-picker.delete') }}
                </span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-center mt-5">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :current-page="imageQuery.offset / imageQuery.limit + 1"
            :page-size="imageQuery.limit"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <p v-if="images.length < 1" class="text-center">
      {{ 'No image' }}
    </p>
  </DialogWrapper>
</template>
<script>
import qs from 'qs'
import FormData from 'form-data'
import { DialogWrapper } from '~templates/Dialog'
import fileMixin from '~/mixins/file'
/**
 * Emits event my-media-picker-dialog-selected, my-media-picker-delete
 */
export default {
  components: {
    DialogWrapper,
    FileUploader: () => import('~templates/Input/FileUploader.vue'),
  },
  mixins: [fileMixin],
  props: {
    id: {
      type: String,
      required: true,
    },
    getEndpoint: {
      type: String,
      default: '/medias',
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
  data() {
    return {
      pickedList: [],
      fileList: null,
      imageQuery: {
        offset: 0,
        limit: 10,
      },
      images: [],
      total: 0,
      isLoading: false,
    }
  },
  computed: {
    baseImageURL() {
      return `${process.env.API_URL}/upload/images/`
    },
  },
  methods: {
    show() {
      this.$refs.mediaPickerDialog.show()
    },
    hide() {
      this.$refs.mediaPickerDialog.hide()
    },
    clearImageDialog() {
      this.fileList = null
      this.pickedList = []
    },
    async fetchImages() {
      try {
        this.isLoading = true
        if (this.type) {
          this.imageQuery.filter = JSON.stringify({
            type: {
              $equals: this.type,
            },
          })
        }
        const { data } = await this.$authApi.get(
          this.getEndpoint +
            '?' +
            qs.stringify(this.imageQuery, { arrayFormat: 'repeat' })
        )
        this.$set(this, 'images', data.results)
        this.$set(this, 'total', data.total)
        this.isLoading = false
      } catch (err) {
        this.isLoading = false
        this.$dev.error(err)
      }
    },
    handleImageSelect(image) {
      this.pickedList.push({
        fileName: image.fileName,
        links: {
          medium: `${this.baseImageURL}${image.links.medium}`,
          origin: `${this.baseImageURL}${image.links.origin}`,
          thumbnail: `${this.baseImageURL}${image.links.thumbnail}`,
        },
      })
    },
    async handleImageDelete(imageId) {
      this.isLoading = true
      await this.$authApi.delete('/medias/' + imageId)
      await this.fetchImages()
      this.isLoading = false
      this.$emit('my-media-picker-delete')
    },
    handleImageClick(index) {
      this.selectedIndex = index
    },
    async handlePageChange(currentPage) {
      this.imageQuery.offset = (currentPage - 1) * this.imageQuery.limit
      await this.fetchImages()
    },
    cancelUploadFile() {
      this.fileList = null
    },
    onDoneSelectingFiles() {
      this.$emit('my-media-picker-dialog-selected', this.pickedList)
      this.$root.$emit('my-dialog-hide', this.id)
      this.clearImageDialog()
    },
    async uploadFile() {
      try {
        this.isLoading = true
        await Promise.all(
          this.fileList.map(async (file, rowIndex) => {
            const [medium, thumbnail] = await Promise.all([
              this.resize(file.url, 1280),
              this.resize(file.url, 576),
            ])
            const resizedList = new FormData()
            resizedList.append('origin', file.raw, file.raw.name)
            resizedList.append('medium', medium, medium.name)
            resizedList.append('thumbnail', thumbnail, thumbnail.name)
            resizedList.append('type', this.type)
            const { data } = await this.$authApi.post('/medias', resizedList, {
              headers: {
                'content-type': `multipart/form-data; boundary=${resizedList._boundary}`,
              },
            })
            return data
          })
        )
        this.clearImageDialog()
        await this.fetchImages()
        this.isLoading = false
      } catch (err) {
        this.$dev.error(err)
        this.isLoading = false
      }
    },
  },
}
</script>
<style lang="scss">
.media-picker {
  .el-dialog__header {
    border-bottom-width: 1px;
    padding-bottom: 20px;
  }
  .el-dialog__body {
    padding: 0;
  }
}
</style>
