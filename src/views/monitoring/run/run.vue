<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="地级市">
              <el-select v-model="listQuery.cityId">
                <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="医疗机构">
              <el-select v-model="listQuery.orgId">
                <el-option v-for="item in mechanismList" :key="item.id" :value="item.id" :label="item.institutionName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="日期">
              <el-date-picker
                v-model="listQuery.date"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              />
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
        <el-table-column label="序号" prop="terminalId" />
        <el-table-column label="医疗机构" prop="orgName" />
        <el-table-column label="设备名称" prop="terminalName" />
        <el-table-column label="规格型号" prop="specs">
          <template slot-scope="scope">
            {{ scope.row.specs }} {{ scope.row.model }}
          </template>
        </el-table-column>
        <el-table-column label="核定工时" prop="approvedMillis">
          <template slot-scope="scope">
            {{ scope.row.approvedMillis | millisecondToOther }}
          </template>
        </el-table-column>
        <el-table-column label="值班时长" prop="dutyMillis">
          <template slot-scope="scope">
            {{ scope.row.dutyMillis | millisecondToOther }}
          </template>
        </el-table-column>
        <el-table-column label="开机次数" prop="openCount" />
        <el-table-column label="关机次数" prop="closeCount" />
        <el-table-column label="操作" prop="action" fixed="right" width="150">
          <template slot-scope="scope">
            <HButton :permission="pMonitoring.run.view" type="check" @click="handleCheck(scope.row)">查看详情</HButton>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <ActionCheck ref="ActionCheck" />
  </div>
</template>

<script>
import { fetchRunList } from '@/api/monitoring/run'
import { fetchAllCity, fetchAllMechanism } from '@/api/global'
import ActionCheck from './components/ActionCheck'
import { mapGetters } from 'vuex'

export default {
  name: 'ExponentPage',
  components: { ActionCheck },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        cityId: '',
        orgId: '',
        date: new Date()
      },
      tableData: [],
      total: 0,
      cityList: [],
      mechanismList: []
    }
  },
  computed: {
    ...mapGetters([
      'pMonitoring'
    ])
  },
  created() {
    this.getList()
    this.getCityList()
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
      fetchRunList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        date: '',
        cityId: '',
        orgId: ''
      }
    },
    getCityList() {
      fetchAllCity().then(res => {
        this.cityList = res.data
      })
    },
    handleCheck(data) {
      this.$refs.ActionCheck.openDialog({ ...data }, this.listQuery.date)
    },
    getMechanismList() {
      fetchAllMechanism().then(res => {
        this.mechanismList = res.data
      })
    }
  }
}
</script>
