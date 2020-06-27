<template>
  <el-dialog
    title="医疗装备效率指数查询"
    :visible.sync="dialogVisible"
    width="900px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <el-table :data="tableData" border>
      <el-table-column prop="bootRate" label="开机率" />
      <el-table-column prop="intactRate" label="完好率" />
      <el-table-column prop="malfunctionRate" label="故障率" />
      <el-table-column prop="machineUtilization" label="机时利用率" />
      <el-table-column prop="workloadRate" label="工作量预测符合率" />
      <el-table-column prop="yearTime" label="年份" />
    </el-table>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchExponentCheckExponent } from '@/api/benefit/exponent'

export default {
  name: 'ActionCheckExponent',
  data() {
    return {
      dialogVisible: false,
      listQuery: {},
      tableData: []
    }
  },
  methods: {
    openDialog(data) {
      this.listQuery.terminalId = data.terminalId
      this.listQuery.forecastResearch = data.forecastResearch
      this.listQuery.forecastWorkload = data.forecastWorkload
      this.listQuery.standardTime = data.standardTime
      this.dialogVisible = true
      this.getList()
    },
    closeEvent() {
      this.tableData = []
      this.listQuery = {}
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    getList() {
      fetchExponentCheckExponent(this.listQuery).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
