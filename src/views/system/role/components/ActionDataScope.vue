<template>
  <el-dialog
    title="编辑数据权限范围"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :rules="rules" name="actionForm" label-width="120px" label-position="left" :model="formList">
        <el-form-item label="数据权限范围" prop="dataScope">
          <el-select v-model="formList.dataScope">
            <el-option v-for="item in dataScopeList" :key="item.value" :value="item.value" :label="item.label" />
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
import { fetchRoleUpdateScope } from '@/api/system/role'
import { selectValidator } from '@/utils/validate'
const dataScopeList = [
  { label: '可以查看所有数据', value: 1 },
  { label: '可以查看当前机构所有数据', value: 2 },
  { label: '可以查看当前科室所有数据', value: 3 }
]

export default {
  name: 'ActionAdd',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      formList: {
        dataScope: ''
      },
      roleId: null,
      rules: {
        dataScope: selectValidator
      },
      dataScopeList
    }
  },
  methods: {
    openDialog(data) {
      this.roleId = data.id
      this.formList.dataScope = data.dataScopeIndex
      this.dialogVisible = true
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
          fetchRoleUpdateScope({
            roleId: this.roleId,
            dataScope: this.formList.dataScope
          }).then(res => {
            this.$message({
              type: 'success',
              message: '编辑数据权限成功'
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
