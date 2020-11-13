<template>
  <el-dialog
    :title="`${eqName}-${originalValue}`"
    :visible.sync="dialogVisible"
    width="900px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <el-table :data="tableData" border>
      <el-table-column align="center" show-overflow-tooltip prop="checkCount" label="诊疗项次" />
      <el-table-column align="center" show-overflow-tooltip prop="income" label="收入" />
      <el-table-column align="center" show-overflow-tooltip prop="payback" label="回本期" />
      <el-table-column align="center" show-overflow-tooltip prop="yearTime" label="年份" />
    </el-table>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchYieldCheckYield } from '@/api/benefit/yield'

export default {
  name: 'ActionCheckYield',
  data() {
    return {
      dialogVisible: false,
      listQuery: {},
      tableData: [],
      eqName: '',
      originalValue: ''
    }
  },
  methods: {
    openDialog(data) {
      this.listQuery.terminalId = data.terminalId
      this.listQuery.originalValue = data.originalValue
      this.eqName = data.eqName
      this.originalValue = data.originalValue
      this.dialogVisible = true
      this.getList()
    },
    closeEvent() {
      this.tableData = []
      this.listQuery = {}
      this.eqName = ''
      this.originalValue = ''
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    getList() {
      fetchYieldCheckYield(this.listQuery).then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
