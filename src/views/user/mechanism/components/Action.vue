<template>
  <el-dialog
    :title="dialogTitle[dialogType]"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    @closed="closeEvent"
    @open="openEvent"
  >
    <div>
      <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="top" :disabled="dialogType === 2">

        <el-form-item label="机构名称" prop="institutionName">
          <el-input v-model="formList.institutionName" />
        </el-form-item>

        <el-form-item label="机构第二名称" prop="institutionNickname">
          <el-input v-model="formList.institutionNickname" />
        </el-form-item>

        <el-form-item label="医疗机构执业许可证代码" prop="licenseCode">
          <el-input v-model="formList.licenseCode" />
        </el-form-item>

        <el-form-item label="有效期" prop="expirationDate">
          <el-date-picker
            v-model="formList.expirationDate"
            type="datetime"
            placeholder="选择日期时间"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
          />
        </el-form-item>

        <el-form-item label="卫生机构（组织）分类代码" prop="classificationCode">
          <el-input v-model="formList.classificationCode" />
        </el-form-item>

        <el-form-item label="主管单位" prop="organizer">
          <el-input v-model="formList.organizer" />
        </el-form-item>

        <el-form-item label="等级" prop="grade">
          <el-select v-model="formList.grade">
            <el-option v-for="item in gradeList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="所有制形式" prop="ownership">
          <el-select v-model="formList.ownership">
            <el-option v-for="item in ownershipList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="营利性" prop="forProfit">
          <el-select v-model="formList.forProfit">
            <el-option v-for="item in forProfitList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="隶属关系" prop="affiliation">
          <el-select v-model="formList.affiliation">
            <el-option v-for="item in affiliationList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="地级市" prop="cityId">
          <el-select v-model="formList.cityId" @change="handleCityChange">
            <el-option v-for="item in cityList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="区县" prop="districtCountyId">
          <el-select v-model="formList.districtCountyId">
            <el-option v-for="item in districtCountyList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="医院通讯地址" prop="hospitalAddress">
          <el-input v-model="formList.hospitalAddress" />
        </el-form-item>

        <el-form-item label="机构网址" prop="mechanismUrl">
          <el-input v-model="formList.mechanismUrl" />
        </el-form-item>

        <el-form-item label="负责人姓名" prop="principal">
          <el-input v-model="formList.principal" />
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="formList.sex">
            <el-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="职务" prop="jobTitle">
          <el-input v-model="formList.jobTitle" />
        </el-form-item>

        <el-form-item label="负责人联系电话" prop="contactPhone">
          <el-input v-model="formList.contactPhone" />
        </el-form-item>

      </el-form>
    </div>
    <div v-if="dialogType !== 2" slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { fetchMechanismAdd, fetchMechanismUpdate } from '@/api/user/mechanism'
import { inputValidator, selectValidator } from '@/utils/validate'
import { fetchRegion } from '@/api/global'
const ownershipList = [
  { label: '全民', value: 1 },
  { label: '集体', value: 2 },
  { label: '私人', value: 3 },
  { label: '中外合资', value: 4 },
  { label: '其他性质', value: 5 }
]
const gradeList = [
  { label: '一甲', value: 1 },
  { label: '二甲', value: 2 },
  { label: '三甲', value: 3 }
]
const forProfitList = [
  { label: '营利', value: true },
  { label: '非营利', value: false }
]
const affiliationList = [
  { label: '中央属', value: 1 },
  { label: '省、直辖市', value: 2 },
  { label: '自治区属', value: 3 },
  { label: '省辖市', value: 4 },
  { label: '地区（盟）属', value: 5 },
  { label: '省辖市区', value: 6 },
  { label: '地辖市、县（旗）属', value: 7 },
  { label: '街道办事处属、乡（镇）属', value: 8 },
  { label: '村属', value: 9 }
]
const sexList = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      dialogType: 0,
      dialogTitle: ['新增', '编辑', '查看'],
      formList: {},
      rules: {
        institutionName: inputValidator,
        institutionNickname: inputValidator,
        licenseCode: inputValidator,
        expirationDate: selectValidator,
        classificationCode: inputValidator,
        organizer: inputValidator,
        grade: selectValidator,
        ownership: selectValidator,
        forProfit: selectValidator,
        affiliation: selectValidator,
        hospitalAddress: inputValidator,
        mechanismUrl: inputValidator,
        jobTitle: inputValidator,
        contactPhone: inputValidator,
        principal: inputValidator,
        sex: selectValidator,
        cityId: selectValidator,
        districtCountyId: selectValidator
      },
      ownershipList,
      gradeList,
      forProfitList,
      affiliationList,
      sexList,
      cityList: [],
      districtCountyList: []
    }
  },
  methods: {
    openDialog(type, data) {
      this.dialogVisible = true
      this.dialogType = type
      if (data) {
        this.formList = data
      }
      this.getRegio()
    },
    openEvent() {
      if (this.$refs.formList) {
        this.$refs.formList.clearValidate()
      }
    },
    closeEvent() {
      this.formList = {}
      this.cityList = []
      this.districtCountyList = []
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.$refs.formList.validate((valid) => {
        if (valid) {
          if (this.dialogType === 0) {
            fetchMechanismAdd(this.formList).then(res => {
              this.$message({
                type: 'success',
                message: '新增成功'
              })
              this.$emit('getList')
              this.dialogVisible = false
            })
          } else {
            fetchMechanismUpdate(this.formList).then(res => {
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
    getRegio() {
      fetchRegion().then(res => {
        this.cityList = res.data
        this.handleCityChange(this.formList.cityId)
      })
    },
    handleCityChange(value) {
      if (value) {
        this.districtCountyList = this.cityList.find(item => item.id === value).districtCountyVos
      }
    }
  }
}
</script>
