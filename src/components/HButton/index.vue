<template>
  <el-button v-if="permissionShow" :type="buttonType" :icon="iconType" v-bind="$attrs" v-on="$listeners">
    <slot v-if="$slots.default" />
    <span v-else> {{ text }}</span>
  </el-button>
</template>

<script>
const typeList = [
  { icon: 'el-icon-plus', type: 'add', buttonType: 'primary', text: '新增' },
  { icon: 'el-icon-edit', type: 'update', buttonType: 'primary', text: '编辑' },
  { icon: 'el-icon-view', type: 'check', buttonType: 'primary', text: '查看' },
  { icon: 'el-icon-del', type: 'delete', buttonType: 'danger', text: '删除' },
  { icon: 'el-icon-search', type: 'search', buttonType: 'primary', text: '搜索' },
  { icon: 'el-icon-refresh-left', type: 'reset', buttonType: '', text: '重置' },
  { icon: 'el-icon-download', type: 'download', buttonType: 'primary', text: '下载报表' },
  { icon: 'el-icon-upload', type: 'upload', buttonType: 'primary', text: '上传文件' },
  { icon: 'el-icon-attract', type: 'bind', buttonType: 'primary', text: '绑定' },
  { icon: 'el-icon-attract', type: 'unbind', buttonType: 'danger', text: '解绑' }
]
export default {
  name: 'HButton',
  props: {
    type: {
      type: String,
      default() {
        return 'update'
      }
    },
    icon: {
      type: String,
      default() {
        return ''
      }
    },
    permission: {
      type: String,
      default() {
        return ''
      }
    }
  },
  computed: {
    iconType() {
      if (this.icon) {
        return this.icon
      } else {
        const typeItem = typeList.find(item => item.type === this.type)
        return typeItem ? typeItem.icon : 'el-icon-sugar'
      }
    },
    buttonType() {
      const typeItem = typeList.find(item => item.type === this.type)
      return typeItem ? typeItem.buttonType : 'primary'
    },
    text() {
      const typeItem = typeList.find(item => item.type === this.type)
      return typeItem ? typeItem.text : ''
    },
    permissionShow() {
      if (!this.permission) {
        return true
      } else {
        return this.checkPermission(this.permission)
      }
    }
  }
}
</script>
