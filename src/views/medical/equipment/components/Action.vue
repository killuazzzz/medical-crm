<template>
  <el-dialog
    :title="dialogTitle[dialogType]"
    :visible.sync="dialogVisible"
    width="1200px"
    :close-on-click-modal="false"
    @closed="closeEvent"
    @opened="openEvent"
  >
    <div>
      <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="right" label-width="140px" :disabled="dialogType === 2">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="设备基础信息" name="1">

            <el-form-item label="设备名称" prop="eqName">
              <el-input v-model="formList.eqName" />
            </el-form-item>
            <el-form-item label="规格" prop="specs">
              <el-input v-model="formList.specs" />
            </el-form-item>

            <el-form-item label="型号" prop="model">
              <el-input v-model="formList.model" />
            </el-form-item>

            <el-form-item label="单位" prop="unit">
              <el-select v-model="formList.unit">
                <el-option v-for="item in unitList" :key="item" :value="item" :label="item" />
              </el-select>
            </el-form-item>

            <el-form-item label="原值" prop="originalValue">
              <el-input v-model="formList.originalValue" type="number" />
            </el-form-item>

            <el-form-item label="产地" prop="area">
              <el-input v-model="formList.area" />
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

            <el-form-item label="S/N" prop="snCode">
              <el-input v-model="formList.snCode" />
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

            <el-form-item label="合同编号" prop="contractNo">
              <el-input v-model="formList.contractNo" />
            </el-form-item>

            <el-form-item label="维修商" prop="repairer">
              <el-input v-model="formList.repairer" />
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

            <el-form-item label="注册证名称" prop="regName">
              <el-input v-model="formList.regName" />
            </el-form-item>

            <el-form-item label="注册证编号" prop="regCode">
              <el-input v-model="formList.regCode" />
            </el-form-item>

            <el-form-item label="档案编号" prop="fileNo">
              <el-input v-model="formList.fileNo" />
            </el-form-item>

            <el-form-item label="院内编码" prop="inHospitalCode">
              <el-input v-model="formList.inHospitalCode" />
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

            <el-form-item label="台账类别" prop="ledgerCategory">
              <el-select v-model="formList.ledgerCategory">
                <el-option v-for="item in ledgerCategoryList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="安装日期" prop="installDate">
              <el-date-picker
                v-model="formList.installDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>

            <el-form-item label="存放地点" prop="storageArea">
              <el-input v-model="formList.storageArea" />
            </el-form-item>

            <el-form-item label="所属院区" prop="hospitalArea">
              <el-input v-model="formList.hospitalArea" />
            </el-form-item>

            <el-form-item label="使用科室" prop="useDepartment">
              <el-input v-model="formList.useDepartment" />
            </el-form-item>

            <el-form-item label="使用科室负责人" prop="useDepartmentPrincipal">
              <el-input v-model="formList.useDepartmentPrincipal" />
            </el-form-item>

            <el-form-item label="安装环境及要求" prop="installClaim">
              <el-input v-model="formList.installClaim" />
            </el-form-item>

            <el-form-item label="大型设备类别" prop="largeEqCategory">
              <el-select v-model="formList.largeEqCategory">
                <el-option v-for="item in largeEqCategoryList" :key="item.id" :value="item.id" :label="item.name" />
              </el-select>
            </el-form-item>

            <el-form-item label="大型设备阶梯分型" prop="largeEqType">
              <el-select v-model="formList.largeEqType">
                <el-option v-for="item in largeEqTypeList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="配置许可证编号" prop="licenseNumber">
              <el-input v-model="formList.licenseNumber" />
            </el-form-item>

            <el-form-item label="财政分类" prop="fiscalClassification">
              <el-select v-model="formList.fiscalClassification">
                <el-option v-for="item in fiscalClassificationList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="经费来源" prop="fundingSource">
              <el-select v-model="formList.fundingSource">
                <el-option v-for="item in fundingSourceList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="用途" prop="eqUse">
              <el-select v-model="formList.eqUse">
                <el-option v-for="item in eqUseList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="设备照片" prop="licenseNumber">
              <el-input v-model="formList.a" />
            </el-form-item>

            <el-form-item label="设备铭牌照片" prop="licenseNumber">
              <el-input v-model="formList.b" />
            </el-form-item>

            <el-form-item label="是否计量器具" prop="measuringTool">
              <el-select v-model="formList.measuringTool">
                <el-option v-for="item in booleanList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="是否特种设备" prop="specialEquipment">
              <el-select v-model="formList.specialEquipment">
                <el-option v-for="item in booleanList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="报废日期" prop="retirementDate">
              <el-date-picker
                v-model="formList.retirementDate"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <!--
            <el-form-item label="设备状态" prop="eqStatus">
              <el-select v-model="formList.eqStatus">
                <el-option v-for="item in eqStatusList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item>

            <el-form-item label="维修标志" prop="repairSign">
              <el-select v-model="formList.repairSign">
                <el-option v-for="item in booleanList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>

            <el-form-item label="作废标志" prop="voidSign">
              <el-select v-model="formList.voidSign">
                <el-option v-for="item in booleanList" :key="item.value" :value="item.value" :label="item.label" />
              </el-select>
            </el-form-item> -->
          </el-tab-pane>
          <el-tab-pane label="设备效率与效益设置" name="2">

            <el-form-item label="设备值班时长（日）" prop="dutyDuration">
              <el-input v-model="formList.dutyDuration" type="number" class="input-append">
                <template slot="append">小时</template>
              </el-input>
            </el-form-item>

            <el-form-item label="设备核定工时（日）" prop="approvedHours">
              <el-input v-model="formList.approvedHours" type="number" class="input-append">
                <template slot="append">小时</template>
              </el-input>
            </el-form-item>

            <el-form-item label="设备既有功能数" prop="existingNum">
              <el-input v-model="formList.existingNum" />
            </el-form-item>

            <el-form-item label="使用功能数" prop="useNum" type="number">
              <el-input v-model="formList.useNum" />
            </el-form-item>

            <el-form-item label="设备工作量预测数" prop="workloadNum">
              <el-input v-model="formList.workloadNum" type="number" />
            </el-form-item>

            <el-form-item label="科研工作量预测数" prop="researchNum">
              <el-input v-model="formList.researchNum" type="number" />
            </el-form-item>

          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
    <div v-if="dialogType !== 2" slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchEquipmentDetail, fetchEquipmentAdd, fetchEquipmentUpdate } from '@/api/medical/equipment'
import { fetchLargeEqCategory, fetchClassification, fetchUnitList } from '@/api/global'
import { inputValidator } from '@/utils/validate'
const eqStatusList = [
  { label: '在用', value: 1 },
  { label: '故障', value: 2 },
  { label: '报废', value: 3 },
  { label: '未出库', value: 4 }
]
const eqUseList = [
  { label: '医疗', value: 1 },
  { label: '科研', value: 2 },
  { label: '教学', value: 3 },
  { label: '其他', value: 4 }
]
const fiscalClassificationList = [
  { label: '家具', value: 1 },
  { label: '通用设备-办公设备', value: 2 },
  { label: '通用办公设备-交通工具', value: 3 },
  { label: '通用设备-其他', value: 4 },
  { label: '消防设施', value: 5 },
  { label: '专用设备', value: 6 },
  { label: '一般设备', value: 7 },
  { label: '其他固定资产', value: 8 }
]
const fundingSourceList = [
  { label: '自筹', value: 1 },
  { label: '财政拨款', value: 2 },
  { label: '教育', value: 3 },
  { label: '捐赠', value: 4 },
  { label: '基建', value: 5 },
  { label: '协作经费', value: 6 },
  { label: '科研', value: 7 },
  { label: '贷款', value: 8 },
  { label: '其它', value: 9 },
  { label: '多种资金来源', value: 10 }
]
const largeEqTypeList = [
  { label: '未实施阶梯分型', value: 1 },
  { label: '临床实用型', value: 2 },
  { label: '临床研究型', value: 3 },
  { label: '科研型', value: 4 }
]
const ledgerCategoryList = [
  { label: '固定资产账', value: 1 },
  { label: '第三方账', value: 2 },
  { label: '试用帐', value: 3 },
  { label: '低值耐用账', value: 4 },
  { label: '基建账', value: 5 }
]
const booleanList = [
  { label: '是', value: true },
  { label: '否', value: false }
]

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      dialogTitle: ['新增', '编辑', '查看'],
      id: null,
      formList: {
        fiscalClassification: 6,
        ledgerCategory: 1,
        unit: '台',
        dutyDuration: 24,
        approvedHours: 8
      },
      rules: {
        eqName: inputValidator,
        originalValue: inputValidator
      },
      loading: false,
      activeName: '1',
      largeEqCategoryList: [],
      brandNameList: [],
      unitList: [],
      booleanList, largeEqTypeList, fundingSourceList, fiscalClassificationList, eqUseList, eqStatusList, ledgerCategoryList
    }
  },
  methods: {
    openDialog(type, data) {
      this.$store.dispatch('app/setLoading', true)
      this.loading = true
      this.dialogVisible = true
      this.dialogType = type
      if (data) {
        this.id = data.id
        this.getDetail().then(res => {
          this.getClassification(res.data.brandNameName)
        })
      }
      if (this.largeEqCategoryList.length === 0) {
        this.getLargeEqCategory()
      }
      if (this.unitList.length === 0) {
        this.getUnitList()
      }
    },
    closeEvent() {
      this.formList = {
        fiscalClassification: 6,
        ledgerCategory: 1,
        unit: '台',
        dutyDuration: 24,
        approvedHours: 8
      }
    },
    openEvent() {
      if (this.$refs.formList) {
        this.$refs.formList.clearValidate()
      }
      this.$store.dispatch('app/setLoading', false)
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$refs.formList.validate((valid) => {
        if (valid) {
          if (this.dialogType === 0) {
            fetchEquipmentAdd(this.formList).then(res => {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
              this.$emit('getList')
              this.dialogVisible = false
            })
          } else {
            fetchEquipmentUpdate(this.formList).then(res => {
              this.$message({
                type: 'success',
                message: '编辑成功'
              })
              this.$emit('getList')
              this.dialogVisible = false
            })
          }
        }
      })
    },
    getDetail() {
      return fetchEquipmentDetail(this.id).then(res => {
        this.formList = res.data
        this.$refs.formList.clearValidate()
        return res
      })
    },
    getLargeEqCategory() {
      fetchLargeEqCategory().then(res => {
        this.largeEqCategoryList = res.data
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
    },
    getUnitList() {
      fetchUnitList().then(res => {
        this.unitList = res.data
      })
    }
  }
}
</script>
