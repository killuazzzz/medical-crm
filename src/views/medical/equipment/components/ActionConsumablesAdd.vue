<template>
  <el-dialog
    title="耗材信息新增"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="left" label-width="130px">

        <el-form-item label="附属设备名称" prop="coName">
          <el-input v-model="formList.coName" />
        </el-form-item>

        <el-form-item label="规格" prop="specification">
          <el-input v-model="formList.specification" />
        </el-form-item>

        <el-form-item label="生产商" prop="manufacturer">
          <el-input v-model="formList.manufacturer" />
        </el-form-item>

        <el-form-item label="生产商地址" prop="manufacturerArea">
          <el-input v-model="formList.manufacturerArea" />
        </el-form-item>

        <el-form-item label="出厂日期" prop="productionDate">
          <el-date-picker
            v-model="formList.productionDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item label="供应商" prop="supplier">
          <el-input v-model="formList.supplier" />
        </el-form-item>

        <el-form-item label="供应商地址" prop="supplierArea">
          <el-input v-model="formList.supplierArea" />
        </el-form-item>

        <el-form-item label="购置日期" prop="purchaseDate">
          <el-date-picker
            v-model="formList.purchaseDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item label="原值" prop="originalValue">
          <el-input v-model="formList.originalValue" />
        </el-form-item>

        <el-form-item label="配套用途" prop="supportingUses">
          <el-input v-model="formList.supportingUses" />
        </el-form-item>

        <el-form-item label="运输与存储要求" prop="claim">
          <el-input v-model="formList.claim" />
        </el-form-item>

        <el-form-item label="联系方式" prop="contactDetails">
          <el-input v-model="formList.contactDetails" />
        </el-form-item>

        <el-form-item label="联系人姓名" prop="contactName">
          <el-input v-model="formList.contactName" />
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
import { fetchEquipmentConsumablesAdd } from '@/api/medical/equipment'
import { inputValidator, selectValidator } from '@/utils/validate'

export default {
  name: 'ActionConsumablesAdd',
  data() {
    return {
      dialogVisible: false,
      formList: {},
      rules: {
        coName: inputValidator,
        specification: inputValidator,
        originalValue: inputValidator,
        claim: inputValidator,
        contactDetails: inputValidator,
        contactName: inputValidator,
        manufacturer: inputValidator,
        manufacturerArea: inputValidator,
        supplier: inputValidator,
        supplierArea: inputValidator,
        supportingUses: inputValidator,
        expirationDate: selectValidator,
        purchaseDate: selectValidator,
        productionDate: selectValidator
      },
      id: null
    }
  },
  methods: {
    openDialog(id) {
      this.id = id
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
          fetchEquipmentConsumablesAdd({
            ...this.formList,
            equipmentId: this.id
          }).then(res => {
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
