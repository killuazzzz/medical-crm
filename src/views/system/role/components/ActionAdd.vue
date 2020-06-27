<template>
  <el-dialog
    title="新增角色"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :rules="rules" name="actionForm" label-width="100px" label-position="left" :model="formList">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="formList.name" />
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
import { fetchRoleAdd } from '@/api/system/role'

const inputValidator = [{ required: true, message: '请填写此项', trigger: 'blur' }]
export default {
  name: 'ActionAdd',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      formList: {
        roleType: 'Simple',
        name: '',
        hide: false
      },
      rules: {
        name: inputValidator
      }
    }
  },
  methods: {
    openDialog(type) {
      this.dialogVisible = true
      this.dialogType = type
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
          fetchRoleAdd(this.formList).then(res => {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$emit('getList')
            this.dialogVisible = false
          })
        }
      })
    }
  }
}
</script>
