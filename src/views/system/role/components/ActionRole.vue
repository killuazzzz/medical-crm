<template>
  <el-dialog
    title="添加权限"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-tree
        ref="tree"
        :data="treeData"
        :default-checked-keys="treeDefaultKeys"
        :expand-on-click-node="false"
        :props="defaultProps"
        node-key="id"
        show-checkbox
      />
    </div>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchRoleUpdate, fetchRoleAllInfo, fetchRoleInfo } from '@/api/system/role'
import { inputValidator } from '@/utils/validate'
function handlePermissionId(data) {
  data.forEach(item => {
    if (item.permissions && item.permissions.length > 0) {
      item.permissions.forEach(subItem => {
        subItem.id += 1000
      })
    }
    if (item.childMenus && item.childMenus.length > 0) {
      handlePermissionId(item.childMenus)
    }
  })
  return data
}
function handlePermissions(data) {
  data.forEach(item => {
    if (item.childMenus && item.childMenus.length > 0) {
      handlePermissions(item.childMenus)
    } else {
      if (item.permissions && item.permissions.length > 0) {
        item.childMenus = item.permissions
        handlePermissions(item.childMenus)
      }
    }
  })
  return data
}

export default {
  name: 'ActionRole',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      formList: {
      },
      rules: {
        name: inputValidator
      },
      defaultProps: {
        children: 'childMenus',
        label: 'name'
      },
      id: '',
      permissionIds: [],
      menuIds: [],
      treeData: [],
      treeDefaultKeys: []
    }
  },
  methods: {
    openDialog(data) {
      this.dialogVisible = true
      this.id = data
      fetchRoleAllInfo().then(res => {
        this.treeData = handlePermissions(handlePermissionId(res.data))
      })
      fetchRoleInfo(this.id).then(res => {
        const permissionIds = res.data.permissionIds.map(item => item + 1000)
        this.treeDefaultKeys = permissionIds
      })
    },
    closeEvent() {
      this.id = ''
      this.permissionIds = []
      this.menuIds = []
      this.treeData = []
      this.treeDefaultKeys = []
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      const treeCheckKeys = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      const menuIds = []
      const permissionIds = []
      treeCheckKeys.forEach(item => {
        if (item > 1000) {
          permissionIds.push(item - 1000)
        } else {
          menuIds.push(item)
        }
      })
      fetchRoleUpdate({
        menuIds,
        permissionIds,
        roleId: this.id
      }).then(res => {
        this.$message({
          type: 'success',
          message: '权限修改成功'
        })
        this.$emit('getList')
        this.dialogVisible = false
      })
    },
    getInfo(id) {
      return fetchRoleAllInfo(id)
    }
  }
}
</script>
