<template>
  <el-dialog
    :title="dialogTitle[dialogType]"
    :visible.sync="dialogVisible"
    width="1200px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >

    <el-form ref="formList" :model="formList" :rules="rules" name="actionForm" :inline="true" label-position="right" label-width="130px" :disabled="dialogType === 2">

      <el-form-item label="医疗设备名称">
        <el-input v-model="formList.hospitalName" readonly="" />
      </el-form-item>

      <el-form-item label="保持时间" prop="holdTime">
        <el-input v-model="formList.holdTime" type="number" />
      </el-form-item>

      <!-- <el-form-item label="结束时间" prop="unit">
        <el-input v-model="formList.unit" type="number" />
      </el-form-item> -->

      <el-form-item label="启动电流" prop="startingCurrent">
        <el-input v-model="formList.startingCurrent" type="number" />
      </el-form-item>

      <el-form-item label="结束电流" prop="endCurrent">
        <el-input v-model="formList.endCurrent" type="number" />
      </el-form-item>

      <el-form-item label="电流上限" prop="upperCurrentLimit">
        <el-input v-model="formList.upperCurrentLimit" type="number" />
      </el-form-item>

      <el-form-item label="待机电流" prop="standbyCurrent">
        <el-input v-model="formList.standbyCurrent" type="number" />
      </el-form-item>

      <el-form-item label="距离开始" prop="approachDistance">
        <el-input v-model="formList.approachDistance" type="number" />
      </el-form-item>

      <el-form-item label="距离结束" prop="farDistance">
        <el-input v-model="formList.farDistance" type="number" />
      </el-form-item>

      <el-form-item label="图像开始" prop="imageStart">
        <el-input v-model="formList.imageStart" type="number" />
      </el-form-item>

      <el-form-item label="图像结束" prop="imageEnd">
        <el-input v-model="formList.imageEnd" type="number" />
      </el-form-item>

      <el-form-item label="重量开始" prop="weightStart">
        <el-input v-model="formList.weightStart" type="number" />
      </el-form-item>

      <el-form-item label="重量结束" prop="weightEnd">
        <el-input v-model="formList.weightEnd" type="number" />
      </el-form-item>

      <el-form-item label="光电计数比例" prop="photoelectricProportion">
        <el-input v-model="formList.photoelectricProportion" type="number" />
      </el-form-item>

      <el-form-item label="心跳包间隔时间" prop="heartbeatInterval">
        <el-input v-model="formList.heartbeatInterval" type="number" />
      </el-form-item>

      <el-form-item label="数据包间隔时间" prop="resendInterval">
        <el-input v-model="formList.resendInterval" type="number" />
      </el-form-item>

      <el-form-item label="待机电流误差" prop="standbyCurrentError">
        <el-input v-model="formList.standbyCurrentError" type="number" />
      </el-form-item>

      <el-form-item label="停止时间" prop="stopTime">
        <el-input v-model="formList.stopTime" type="number" />
      </el-form-item>

      <el-form-item label="工作曲线" prop="curveType">
        <el-select v-model="formList.curveType">
          <el-option v-for="item in curveTypeList" :key="item" :value="item" :label="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="工作模式" prop="workType">
        <el-select v-model="formList.workType">
          <el-option v-for="item in workTypeList" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>

    </el-form>
    <div v-if="dialogType !== 2" slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchOperationUpdate } from '@/api/terminal/operation'
import { inputValidator, selectValidator } from '@/utils/validate'
const workTypeList = [
  { label: '距离', value: 1 },
  { label: '图像', value: 2 },
  { label: '重量', value: 4 },
  { label: '光电计数', value: 8 }
]
const curveTypeList = [1, 2, 3]

export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      dialogType: 1,
      dialogTitle: ['新增', '编辑', '查看'],
      formList: {},
      rules: {
        endCurrent: inputValidator,
        heartbeatInterval: inputValidator,
        holdTime: inputValidator,
        workType: selectValidator
      },
      workTypeList,
      curveTypeList
    }
  },
  methods: {
    openDialog(dialogType, data) {
      this.formList = data
      this.dialogType = dialogType
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
          fetchOperationUpdate(this.formList).then(res => {
            this.$message({
              type: 'success',
              message: '编辑成功'
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
