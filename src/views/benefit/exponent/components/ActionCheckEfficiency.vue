<template>
  <el-dialog
    :title="titleList[type]"
    :visible.sync="dialogVisible"
    width="500px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <PieChart :chart-data="chartData" :title-text="``" />
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import PieChart from './PieChart'
const keyList = {
  leve1: '超负荷使用',
  leve2: '高效运转',
  leve3: '中效运转',
  leve4: '低效运转',
  leve5: '闲置不用'
}

export default {
  name: 'ActionCheckEfficiency',
  components: { PieChart },
  data() {
    return {
      dialogVisible: false,
      formList: {},
      rules: {},
      chartData: [],
      type: 1,
      titleList: {
        1: '烟台市32台大型医用设备使用效率分析图',
        2: '全院医用设备使用效率分析图'
      }
    }
  },
  methods: {
    openDialog(type, data) {
      const chartData = []
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const element = data[key]
          chartData.push({
            name: keyList[key],
            count: element
          })
        }
      }
      this.chartData = chartData
      this.type = type
      this.dialogVisible = true
    },
    closeEvent() {
      this.type = 1
      this.chartData = []
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
    }
  }
}
</script>
