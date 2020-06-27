<template>
  <el-dialog
    title="附属设备新增"
    :visible.sync="dialogVisible"
    width="80%"
    :close-on-click-modal="false"
    :append-to-body="true"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="top">

        <el-form-item label="附属设备名称" prop="eqName">
          <el-input v-model="formList.eqName" />
        </el-form-item>

        <el-form-item label="规格" prop="specification">
          <el-input v-model="formList.specification" />
        </el-form-item>

        <el-form-item label="单位" prop="unit">
          <el-select v-model="formList.unit">
            <el-option v-for="item in unitList" :key="item" :value="item" :label="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="原值" prop="originalValue">
          <el-input v-model="formList.originalValue" />
        </el-form-item>

        <el-form-item label="启用日期" prop="activationDate">
          <el-date-picker
            v-model="formList.activationDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item label="产地" prop="area">
          <el-input v-model="formList.area" />
        </el-form-item>

        <el-form-item label="S/N" prop="snCode">
          <el-input v-model="formList.snCode" />
        </el-form-item>

        <el-form-item label="生产商" prop="manufacturer">
          <el-input v-model="formList.manufacturer" />
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

        <el-form-item label="购置日期" prop="purchaseDate">
          <el-date-picker
            v-model="formList.purchaseDate"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item label="配套用途" prop="supportingUses">
          <el-input v-model="formList.supportingUses" />
        </el-form-item>

        <el-form-item label="运输与存储要求" prop="claim">
          <el-input v-model="formList.claim" />
        </el-form-item>

        <el-form-item label="院内编码" prop="inHospitalCode">
          <el-input v-model="formList.inHospitalCode" />
        </el-form-item>

        <el-form-item label="品名" prop="brandNameId">
          <el-select
            v-model="formList.brandNameId"
            filterable
            remote
            reserve-keyword
            :remote-method="getClassification"
            :loading="loading"
          >
            <el-option v-for="item in brandNameList" :key="item.id" :value="item.id" :label="item.name" />
          </el-select>
        </el-form-item>

        <el-form-item label="设备图片" prop="eqImg">
          <el-input v-model="formList.eqImg" />
        </el-form-item>

        <el-form-item label="铭牌图片" prop="brandImg">
          <el-input v-model="formList.brandImg" />
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
import { fetchEquipmentAccessoryAdd } from '@/api/medical/equipment'
import { inputValidator } from '@/utils/validate'
import { fetchUnitList, fetchClassification } from '@/api/global'

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      formList: {},
      rules: {
        eqName: inputValidator,
        snCode: inputValidator
      },
      id: null,
      loading: false,
      unitList: [],
      brandNameList: []
    }
  },
  methods: {
    openDialog(id) {
      this.id = id
      if (this.unitList.length === 0) {
        this.getUnitList()
      }
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
          fetchEquipmentAccessoryAdd({
            ...this.formList,
            equipmentId: this.id
          }).then(res => {
            this.$message({
              type: 'success',
              message: '新增附属设备成功'
            })
            this.$emit('getList')
            this.dialogVisible = false
          })
        }
      })
    },
    getUnitList() {
      fetchUnitList().then(res => {
        this.unitList = res.data
      })
    },
    getClassification(query) {
      if (query) {
        this.loading = true
        fetchClassification(query).then(res => {
          this.brandNameList = res.data
        }).finally(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>
