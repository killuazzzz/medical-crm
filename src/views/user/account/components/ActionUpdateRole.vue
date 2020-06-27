<template>
  <el-dialog
    title="编辑角色"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :rules="rules" name="actionForm" label-width="100px" label-position="left" :model="formList">
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formList.roleId">
            <el-option v-for="item in roleList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchRoleList } from '@/api/system/role'
import { fetchAccountUpdateRole } from '@/api/user/account'
import { selectValidator } from '@/utils/validate'

export default {
  name: 'ActionAdd',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      formList: {
        roleId: '',
        userId: ''
      },
      rules: {
        roleId: selectValidator
      },
      roleList: []
    }
  },
  methods: {
    openDialog(data) {
      this.formList.roleId = data.roleId
      this.formList.userId = data.userId
      this.dialogVisible = true
      if (this.roleList.length === 0) {
        this.getRoleList()
      }
    },
    closeEvent() {
      this.$refs.formList.resetFields()
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$refs.formList.validate((valid) => {
        if (valid) {
          fetchAccountUpdateRole(this.formList).then(res => {
            this.$message({
              type: 'success',
              message: '编辑角色成功'
            })
            this.$emit('getList')
            this.dialogVisible = false
          })
        }
      })
    },
    getRoleList() {
      fetchRoleList({
        page: 1,
        limit: 100,
        hide: false,
        roleType: 'Simple',
        likeName: ''
      }).then(res => {
        this.roleList = res.data.list
      })
    }
  }
}
</script>

