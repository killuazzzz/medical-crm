<template>
  <el-dialog
    :title="`${eqName}-${institutionName}-月报表`"
    :visible.sync="dialogVisible"
    width="900px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <el-form ref="formList" name="listQuery" label-width="100px" label-position="left">
      <el-row :gutter="20">
        <el-col :lg="12" :xl="12">
          <el-form-item label="年份">
            <el-date-picker
              v-model="year"
              format="yyyy"
              value-format="yyyy"
              type="year"
              placeholder="选择年份"
              :picker-options="startDateOpt"
            />
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xl="12">
          <el-form-item label-width="0px">
            <HButton type="search" @click="handleSearch" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs v-model="tabName" @tab-click="handleTabs">
      <el-tab-pane label="工作量" name="1">
        <el-table class="mt-20" :data="tableData1" border>
          <el-table-column prop="monthTime" align="center" show-overflow-tooltip label="日期" width="100" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.monthTime | parseTime('{y}年{m}月') }}
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in daysTemplete" :key="index" align="center" show-overflow-tooltip width="55" :prop="`days[${index + 1}]`" :label="`${index + 1}日`" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="工作时长" name="2">
        <el-table class="mt-20" :data="tableData2" border>
          <el-table-column prop="monthTime" align="center" show-overflow-tooltip label="日期" width="100" fixed="left">
            <template slot-scope="scope">
              {{ scope.row.monthTime | parseTime('{y}年{m}月') }}
            </template>
          </el-table-column>
          <el-table-column v-for="(item, index) in daysTemplete" :key="index" width="55" align="center" show-overflow-tooltip :prop="`days[${index + 1}]`" :label="`${index + 1}日`" />
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
import { fetchMonthCheckMonth } from '@/api/benefit/month'
export default {
  name: 'ActionCheckMonth',
  data() {
    return {
      dialogVisible: false,
      tabName: '1',
      terminalId: undefined,
      institutionName: '',
      eqName: '',
      year: new Date(),
      tableData1: [],
      tableData2: [],
      daysTemplete: new Array(31),
      startDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < new Date(2015, 1, 1).getTime()
        }
      }
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
      fetchMonthCheckMonth({
        type: +type,
        year: new Date(this.year).getFullYear(),
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
    },
    handleSearch() {
      if (+this.tabName === 1) {
        this.getList(1)
      }
      if (+this.tabName === 2) {
        this.getList(2)
      }
    }
  }
}
</script>
