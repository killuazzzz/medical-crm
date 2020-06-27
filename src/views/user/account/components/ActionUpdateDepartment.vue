<template>
  <el-dialog
    title="编辑用户所属的科室"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :rules="rules" name="actionForm" label-width="100px" label-position="left" :model="formList">
        <el-form-item label="科室" prop="departmentId">
          <el-select v-model="formList.departmentId">
            <el-option v-for="item in departmentList" :key="item.departmentId" :value="item.departmentId" :label="item.departmentName" />
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
import { fetchAccountUpdateUserDepartment } from '@/api/user/account'
import { fetchDepartment } from '@/api/global'
import { selectValidator } from '@/utils/validate'

export default {
  name: 'ActionUpdateDepartment',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      formList: {
        departmentId: ''
      },
      rules: {
        departmentId: selectValidator
      },
      userId: null,
      departmentList: []
    }
  },
  methods: {
    openDialog(data) {
      this.userId = data.userId
      this.formList.departmentId = data.departmentId || ''
      this.dialogVisible = true
      if (this.departmentList.length === 0) {
        this.getDepartmentList()
      }
    },
    closeEvent() {
      this.userId = null
      this.$refs.formList.resetFields()
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$refs.formList.validate((valid) => {
        if (valid) {
          fetchAccountUpdateUserDepartment({
            departmentId: this.formList.departmentId,
            userId: this.userId
          }).then(res => {
            this.$message({
              type: 'success',
              message: '编辑用户所属的科室成功'
            })
            this.$emit('getList')
            this.dialogVisible = false
          })
        }
      })
    },
    getDepartmentList() {
      fetchDepartment().then(res => {
        this.departmentList = res.data
      })
    }
  }
}
</script>

