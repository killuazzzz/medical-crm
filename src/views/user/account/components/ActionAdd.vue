<template>
  <el-dialog
    title="新增账号"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <div>
      <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="top">

        <el-form-item label="账号" prop="account">
          <el-input v-model="formList.account" />
        </el-form-item>

        <el-form-item label="科室" prop="departmentId">
          <el-select v-model="formList.departmentId">
            <el-option v-for="item in departmentList" :key="item.departmentId" :value="item.departmentId" :label="item.departmentName" />
          </el-select>
        </el-form-item>

        <el-form-item label="学历" prop="education">
          <el-select v-model="formList.education">
            <el-option v-for="item in educationList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="身份证号" prop="idNumber">
          <el-input v-model="formList.idNumber" />
        </el-form-item>

        <el-form-item label="民族" prop="nation">
          <el-select v-model="formList.nation">
            <el-option v-for="item in nationList" :key="item" :value="item" :label="item" />
          </el-select>
        </el-form-item>

        <el-form-item label="电话" prop="phone">
          <el-input v-model="formList.phone" />
        </el-form-item>

        <el-form-item label="职称" prop="professional">
          <el-select v-model="formList.professional">
            <el-option v-for="item in professionalList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="性别" prop="sex">
          <el-select v-model="formList.sex">
            <el-option v-for="item in sexList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="岗位" prop="station">
          <el-select v-model="formList.station">
            <el-option v-for="item in stationList" :key="item.value" :value="item.value" :label="item.label" />
          </el-select>
        </el-form-item>

        <el-form-item label="毕业院校" prop="university">
          <el-input v-model="formList.university" />
        </el-form-item>

        <el-form-item label="人员姓名" prop="userName">
          <el-input v-model="formList.userName" />
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
import { fetchAccountAdd } from '@/api/user/account'
import { fetchDepartment } from '@/api/global'
import { inputValidator, selectValidator } from '@/utils/validate'
const educationList = [
  { label: '博士生', value: 'Doctor' },
  { label: '研究生', value: 'Graduate' },
  { label: '大学本科', value: 'Undergraduate' },
  { label: '大学专科及专科学校', value: 'Junior' },
  { label: '中专及中技', value: 'Special' },
  { label: '技工学校', value: 'Technical' },
  { label: '高中', value: 'HighSchool' },
  { label: '初中及以下', value: 'JuniorMiddleSchool' }
]
const professionalList = [
  { label: '医士', value: 'Doctor' },
  { label: '医师', value: 'Physician' },
  { label: '住院医师', value: 'Resident' },
  { label: '主治医师', value: 'AttendingDoctor' },
  { label: '副主任医师', value: 'DeputyChiefPhysician' },
  { label: '主任医师', value: 'ChiefPhysician' },
  { label: '护士', value: 'Nurse' },
  { label: '护师', value: 'NursePractitioner' },
  { label: '主管护师', value: 'SupervisorNurse' },
  { label: '副主任护师', value: 'DeputyChiefNurse' },
  { label: '主任护师', value: 'ChiefNurse' }
]
const stationList = [
  { label: '医生', value: 'Doctor' },
  { label: '助产', value: 'Midwifery' },
  { label: '技师', value: 'Technician' },
  { label: '麻醉', value: 'Anaesthesia' },
  { label: '检验', value: 'Test' },
  { label: '药师', value: 'Pharmacist' },
  { label: '教师', value: 'Teacher' },
  { label: '研究', value: 'Research' },
  { label: '工程', value: 'Engineering' },
  { label: '行政人员', value: 'Administrative' },
  { label: '工勤人员', value: 'Handyman' },
  { label: '财会人员', value: 'Accountants' },
  { label: '工程技术人员', value: 'Engineer' },
  { label: '医技人员', value: 'MedicalTechnicians' },
  { label: '护理', value: 'Nurse' },
  { label: '其他', value: 'Other' }
]
const nationList = [
  '汉族',
  '回族',
  '藏族',
  '维吾尔族',
  '苗族',
  '彝族',
  '壮族',
  '布依族',
  '朝鲜族',
  '满族',
  '侗族',
  '瑶族',
  '白族',
  '土家族',
  '哈尼族',
  '哈萨克族',
  '傣族',
  '黎族',
  '傈傈族',
  '佤族',
  '畲族',
  '高山族',
  '拉祜族',
  '水族',
  '东乡族',
  '纳西族',
  '景颇族',
  '柯尔克孜',
  '土族',
  '达斡尔族',
  '仫佬族',
  '羌族',
  '布朗族',
  '撒拉族',
  '毛难族',
  '仡佬族',
  '锡伯族',
  '阿昌族',
  '普米族',
  '塔吉克族',
  '怒族',
  '乌孜别克',
  '俄罗斯族',
  '鄂温克族',
  '崩龙族',
  '保安族',
  '裕固族',
  '京族',
  '塔塔尔族',
  '独龙族',
  '鄂伦春族',
  '赫哲族',
  '门巴族',
  '珞巴族',
  '基诺族',
  '其他'
]
const sexList = [
  { label: '男', value: 'Man' },
  { label: '女', value: 'Woman' },
  { label: '未知', value: 'Unknow' }
]

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      formList: {},
      rules: {
        account: inputValidator,
        departmentId: selectValidator,
        idNumber: inputValidator,
        nation: selectValidator,
        phone: inputValidator,
        sex: selectValidator,
        userName: inputValidator
      },
      educationList, nationList, sexList, professionalList, stationList,
      departmentList: []
    }
  },
  methods: {
    openDialog(data) {
      this.dialogVisible = true
      if (this.departmentList.length === 0) {
        this.getDepartmentList()
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
          fetchAccountAdd(this.formList).then(res => {
            this.$message({
              type: 'success',
              message: '新增账号成功'
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
