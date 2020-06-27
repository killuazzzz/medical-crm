<template>
  <el-dialog
    title="高峰分析图"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <LineChart :chart-data="chartData" />
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import LineChart from './LineChart'

export default {
  name: 'ActionCheckPeak',
  components: { LineChart },
  data() {
    return {
      dialogVisible: false,
      chartData: {}
    }
  },
  methods: {
    openDialog(data) {
      this.chartData = data
      this.dialogVisible = true
    },
    closeEvent() {
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
