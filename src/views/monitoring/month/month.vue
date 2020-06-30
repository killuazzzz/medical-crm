<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="日期">
              <el-date-picker
                v-model="listQuery.date"
                type="month"
                placeholder="选择日期"
                format="yyyy-MM"
              />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="医疗机构">
              <el-select v-model="listQuery.mechanismId" @change="getEqiumentList">
                <el-option v-for="item in mechanismList" :key="item.id" :value="item.id" :label="item.institutionName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="设备">
              <el-select v-model="listQuery.terminalId" filterable>
                <el-option v-for="item in equipmentList" :key="item.terminalId" :value="item.terminalId" :label="item.eqName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label-width="0px">
              <HButton type="search" @click="getList(1)" />
              <HButton type="reset" @click="handleReset" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <h3 class="flex">
        <span>运行情况统计(日报表)</span>
        <span>时长单位: 小时</span>
      </h3>
      <el-table class="mt-10 mb-20" :data="tableData" border>
        <template v-for="(item, index) in tableTemplate">
          <el-table-column :key="index" :label="index === 0 ? '日期' : `${index}日`" :prop="`day${index}`" />
        </template>
      </el-table>
      <el-card>
        <LineChart :chart-data="chartData" />
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { fetchMonitoringMonthList } from '@/api/monitoring/month'
import { fetchAllMechanism, fetchEqiumentList } from '@/api/global'
import LineChart from './components/LineChart'

export default {
  name: 'MonitoringMonthPage',
  components: { LineChart },
  data() {
    return {
      listQuery: {
        date: new Date(),
        mechanismId: '',
        terminalId: ''
      },
      mechanismList: [],
      equipmentList: [],
      tableData: [],
      tableTemplate: Array(32),
      chartData: [],
      loading: false
    }
  },
  created() {
    this.getMechanismList()
  },
  methods: {
    getList(data) {
      if (typeof data === 'object') {
        this.listQuery.page = data.page
        this.listQuery.limit = data.limit
      }
      if (typeof data === 'number') {
        this.listQuery.page = data
      }
      if (!this.listQuery.terminalId) {
        this.$message.warning('请先选择设备！')
        return false
      }
      fetchMonitoringMonthList(this.listQuery).then(res => {
        this.chartData = res.data
        const obj1 = { day0: '工作时长' }
        const obj2 = { day0: '待机时长' }
        const obj3 = { day0: '关机时长' }
        const obj4 = { day0: '离线' }
        res.data.forEach((item, index) => {
          obj1[`day${index + 1}`] = item.workTime
          obj2[`day${index + 1}`] = item.standbyTime
          obj3[`day${index + 1}`] = item.shutdownTime
          obj4[`day${index + 1}`] = item.offlineTime
        })
        const tableData = [obj1, obj2, obj3, obj4]
        this.tableData = tableData
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        date: new Date(),
        mechanismId: this.mechanismList[0].id,
        terminalId: ''
      }
    },
    getMechanismList() {
      fetchAllMechanism().then(res => {
        this.mechanismList = res.data
        this.listQuery.mechanismId = this.mechanismList[0].id
        this.getEqiumentList(this.listQuery.mechanismId)
      })
    },
    getEqiumentList(query) {
      if (query !== '') {
        fetchEqiumentList({
          orgId: query
        }).then(res => {
          this.equipmentList = res.data
          this.listQuery.terminalId = res.data.length > 0 ? res.data[0].terminalId : ''
          if (this.listQuery.terminalId) {
            this.getList()
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
</style>
