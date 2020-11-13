<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="设备名称">
              <el-input v-model="listQuery.eqName" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="设备类别名">
              <el-select v-model="listQuery.largeEqCategory">
                <el-option v-for="item in largeEqCategoryList" :key="item.id" :value="item.id" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="地级市">
              <el-select v-model="listQuery.cityId">
                <el-option v-for="item in cityList" :key="item.id" :value="item.id" :label="item.name" />
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
        <el-table-column align="center" show-overflow-tooltip label="设备名称" prop="eqName" />
        <el-table-column align="center" show-overflow-tooltip label="设备型号" prop="model" />
        <el-table-column align="center" show-overflow-tooltip label="甲乙设备类别名" prop="largeEqCategoryName" />
        <el-table-column align="center" show-overflow-tooltip label="医疗机构" prop="institutionName" />
        <el-table-column align="center" show-overflow-tooltip label="地级市" prop="cityName" />
        <el-table-column align="center" show-overflow-tooltip label="启用日期" prop="activationDate">
          <template slot-scope="scope">
            {{ scope.row.activationDate | parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="原值" prop="originalValue" />
        <el-table-column align="center" label="操作" prop="action" fixed="right" width="200">
          <template slot-scope="scope">
            <HButton :permission="pBenefit.yield.profit" type="check" @click="handleCheckYield(scope.row)">医疗装备收益率查询</HButton>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <ActionCheckYield ref="ActionCheckYield" />
  </div>
</template>

<script>
import { fetchMonthList } from '@/api/benefit/month'
import { fetchLargeEqCategory, fetchAllCity } from '@/api/global'
import ActionCheckYield from './components/ActionCheckYield'
import { mapGetters } from 'vuex'

export default {
  name: 'YieldPage',
  components: { ActionCheckYield },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        cityId: '',
        eqName: '',
        largeEqCategory: ''
      },
      tableData: [],
      total: 0,
      largeEqCategoryList: [],
      cityList: []
    }
  },
  computed: {
    ...mapGetters([
      'pBenefit'
    ])
  },
  created() {
    this.getList()
    this.getLargeEqCategoryList()
    this.getCityList()
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
      fetchMonthList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        eqName: '',
        largeEqCategory: '',
        cityId: ''
      }
    },
    getLargeEqCategoryList() {
      fetchLargeEqCategory().then(res => {
        this.largeEqCategoryList = res.data
      })
    },
    getCityList() {
      fetchAllCity().then(res => {
        this.cityList = res.data
      })
    },
    handleCheckYield(data) {
      this.$refs.ActionCheckYield.openDialog({ ...data })
    }
  }
}
</script>
