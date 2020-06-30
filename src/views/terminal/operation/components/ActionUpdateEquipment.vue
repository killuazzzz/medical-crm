<template>
  <el-dialog
    title="修改终端所属设备"
    :visible.sync="dialogVisible"
    width="400px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >

    <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="top">

      <el-form-item label="设备" prop="equipmentId">
        <el-select v-model="formList.equipmentId">
          <el-option v-for="item in equipmentList" :key="item.id" :value="item.id" :label="item.eqName" />
        </el-select>
      </el-form-item>

    </el-form>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchOperationBind } from '@/api/terminal/operation'
import { fetchEquipmentList } from '@/api/medical/equipment'
import { selectValidator } from '@/utils/validate'

export default {
  name: 'ActionUpdateEquipment',
  data() {
    return {
      dialogVisible: false,
      formList: {},
      rules: {
        equipmentId: selectValidator
      },
      equipmentList: []
    }
  },
  methods: {
    openDialog(data) {
      if (this.equipmentList.length === 0) {
        this.getEquipmentList()
      }
      this.formList = data
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
          fetchOperationBind(this.formList).then(res => {
            this.$message({
              type: 'success',
              message: '绑定成功'
            })
            this.$emit('getList')
            this.dialogVisible = false
          })
        }
      })
    },
    getEquipmentList() {
      fetchEquipmentList({
        page: 1,
        limit: 10000,
        eqName: '',
        largeEqCategory: ''
      }).then(res => {
        this.equipmentList = res.data.list
      })
    }
  }
}
</script>
