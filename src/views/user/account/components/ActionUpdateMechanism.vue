<template>
  <el-dialog
    title="编辑用户所属的医疗机构"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :rules="rules" name="actionForm" label-width="100px" label-position="left" :model="formList">
        <el-form-item label="医疗机构" prop="mechanismId">
          <el-select v-model="formList.mechanismId">
            <el-option v-for="item in mechanismList" :key="item.id" :value="item.id" :label="item.institutionName" />
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
import { fetchAccountUpdateUserMechanism } from '@/api/user/account'
import { fetchAllMechanism } from '@/api/global'
import { selectValidator } from '@/utils/validate'

export default {
  name: 'ActionUpdateDepartment',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      formList: {
        mechanismId: ''
      },
      rules: {
        mechanismId: selectValidator
      },
      userId: null,
      mechanismList: []
    }
  },
  methods: {
    openDialog(data) {
      this.userId = data.userId
      this.formList.mechanismId = data.orgId || ''
      this.dialogVisible = true
      if (this.mechanismList.length === 0) {
        this.getMechanismList()
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
          fetchAccountUpdateUserMechanism({
            mechanismId: this.formList.mechanismId,
            userId: this.userId
          }).then(res => {
            this.$message({
              type: 'success',
              message: '编辑用户所属的医疗机构成功'
            })
            this.$emit('getList')
            this.dialogVisible = false
          })
        }
      })
    },
    getMechanismList() {
      fetchAllMechanism().then(res => {
        this.mechanismList = res.data
      })
    }
  }
}
</script>

