<template>
  <el-dialog
    :title="`${date}日运行使用日志`"
    :visible.sync="dialogVisible"
    width="800px"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <el-form ref="formList" :model="formList" name="actionForm" :inline="true" label-position="top">

      <el-form-item label="关机时长">
        <span>{{ formList.closeMillis | millisecondToOther }} | {{ formList.closePercent }}%</span>
      </el-form-item>

      <el-form-item label="开机时长">
        <span>{{ formList.openMillis | millisecondToOther }} | {{ formList.openPercent }}%</span>
      </el-form-item>

      <el-form-item label="工作时长">
        <span>{{ formList.workMillis | millisecondToOther }} | {{ formList.workPercent }}%</span>
      </el-form-item>

      <el-form-item label="待机时长">
        <span>{{ formList.waitMillis | millisecondToOther }} | {{ formList.waitPercent }}%</span>
      </el-form-item>

      <el-form-item label="关机次数">
        <span>{{ formList.closeCount }}</span>
      </el-form-item>

      <el-form-item label="开机次数">
        <span>{{ formList.openCount }}</span>
      </el-form-item>

      <el-form-item label="机时利用率">
        <span>{{ formList.workApprovePercent }}%</span>
      </el-form-item>

      <el-form-item label="空转率">
        <span>{{ formList.waitOpenPercent }}%</span>
      </el-form-item>

      <el-form-item label="开机利用率">
        <span>{{ formList.notWaitPercent }}%</span>
      </el-form-item>

      <el-form-item label="闲置时长">
        <span>{{ formList.freeMillis | millisecondToOther }}</span>
      </el-form-item>

      <el-form-item label="闲置率">
        <span>{{ formList.freePercent }}%</span>
      </el-form-item>

    </el-form>
    <el-table class="mt-20" :data="tableData" border>
      <el-table-column align="center" show-overflow-tooltip label="序号">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" align="center" show-overflow-tooltip label="开始时间" />
      <el-table-column prop="endTime" align="center" show-overflow-tooltip label="结束时间" />
      <el-table-column prop="holdTime" align="center" show-overflow-tooltip label="持续时间">
        <template slot-scope="scope">
          {{ scope.row.holdTime | millisecondToOther }}
        </template>
      </el-table-column>
      <el-table-column prop="workStatus" align="center" show-overflow-tooltip label="状态">
        <template slot-scope="scope">
          {{ scope.row.workStatus | enumValue(stateList) }}
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { parseTime } from '@/utils/index'
const stateList = [
  { label: '关机', value: 'Shutdown' },
  { label: '工作中', value: 'Working' },
  { label: '空闲', value: 'Free' },
  { label: '数据接口被拔掉', value: 'CutOff' }
]

export default {
  name: 'ActionCheck',
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      formList: {},
      date: '',
      stateList
    }
  },
  methods: {
    openDialog(data, date) {
      this.tableData = data.workDetails
      this.formList = data
      this.date = parseTime(date, '{y}-{m}-{d}')
      this.dialogVisible = true
    },
    closeEvent() {
      this.tableData = []
      this.date = ''
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

<style lang="scss" scoped>
form[name="actionForm"] .el-form-item {
  width: 150px;
}
</style>
