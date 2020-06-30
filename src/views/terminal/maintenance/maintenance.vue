<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="是否绑定设备">
              <el-select v-model="listQuery.bindEquipment">
                <el-option v-for="item in bindEquipmentList" :key="item.value" :value="item.value" :label="item.label" />
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
      <el-table class="mt-20" :data="tableData" border>
        <el-table-column label="设备编号" width="200" prop="deviceNumber" />
        <el-table-column label="终端代码" width="200" prop="terminalCode" />
        <el-table-column label="医疗机构名称" width="200" prop="hospitalName" />
        <el-table-column label="设备名称" prop="deviceName" />
        <el-table-column label="预测科研量" prop="forecastResearch" />
        <el-table-column label="预测工作量" prop="forecastWorkload" />
        <el-table-column label="标准机时" prop="standardTime" />
        <el-table-column label="终端IP" prop="terminalHost" />
        <el-table-column label="终端端口" prop="terminalPort" />
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
  </div>
</template>

<script>
import { fetchMaintenanceList } from '@/api/terminal/maintenance'
const bindEquipmentList = [
  { value: true, label: '已绑定' },
  { value: false, label: '未绑定' }
]

export default {
  name: 'MaintenancePage',
  filters: {
    secondText(value) {
      return value ? value + '秒' : ''
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        bindEquipment: ''
      },
      tableData: [],
      total: 0,
      bindEquipmentList
    }
  },
  created() {
    this.getList()
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
      fetchMaintenanceList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        bindEquipment: ''
      }
    }
  }
}
</script>
