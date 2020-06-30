<template>
  <el-dialog
    :title="`${eqName}-${institutionName}-年报表`"
    :visible.sync="dialogVisible"
    width="900px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <el-tabs v-model="tabName" @tab-click="handleTabs">
      <el-tab-pane label="工作量" name="1">
        <el-table class="mt-20" :data="tableData1" border>
          <el-table-column prop="monthTime" label="日期" width="150" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.monthTime | parseTime('{y}年') }}
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in monthsTemplete" :key="index" width="60" :prop="`months[${index + 1}]`" :label="`${index + 1}月`" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="工作时长" name="2">
        <el-table class="mt-20" :data="tableData2" border>
          <el-table-column prop="monthTime" label="日期" width="150" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.monthTime | parseTime('{y}年') }}
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in monthsTemplete" :key="index" width="60" :prop="`months[${index + 1}]`" :label="`${index + 1}月`" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { fetchMonthCheckYear } from '@/api/benefit/month'
export default {
  name: 'ActionCheckYear',
  data() {
    return {
      dialogVisible: false,
      tabName: '1',
      terminalId: undefined,
      institutionName: '',
      eqName: '',
      tableData1: [],
      tableData2: [],
      monthsTemplete: new Array(12)
    }
  },
  methods: {
    openDialog(data) {
      this.terminalId = data.terminalId
      this.institutionName = data.institutionName
      this.eqName = data.eqName
      this.dialogVisible = true
      this.handleTabs()
    },
    closeEvent() {
      this.tableData1 = []
      this.tableData2 = []
      this.terminalId = undefined
      this.tabName = '1'
      this.institutionName = ''
      this.eqName = ''
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    getList(type) {
      const year = new Date().getFullYear()
      fetchMonthCheckYear({
        type: +type,
        year,
        terminalId: this.terminalId
      }).then(res => {
        if (+type === 1) {
          this.tableData1 = res.data
        } else {
          this.tableData2 = res.data
        }
      })
    },
    handleTabs(tab, event) {
      if (+this.tabName === 1 && this.tableData1.length === 0) {
        this.getList(1)
      }
      if (+this.tabName === 2 && this.tableData2.length === 0) {
        this.getList(2)
      }
    }
  }
}
</script>
