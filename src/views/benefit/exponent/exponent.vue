<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="查询类型">
              <el-select v-model="listQuery.type">
                <el-option :value="1" label="按地级市效率KPI指标分析" />
                <el-option :value="2" label="按医疗机构效率KPI指标分析" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="选择日期">
              <el-date-picker
                v-model="listQuery.yearMonth"
                type="month"
                placeholder="选择日期"
                format="yyyy-MM"
              />
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
            <el-form-item label="医疗机构">
              <el-select v-model="listQuery.institutionId">
                <el-option v-for="item in institutionList" :key="item.id" :value="item.id" :label="item.institutionName" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="设备品牌名">
              <el-select
                v-model="listQuery.classifyId"
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词搜索"
                :remote-method="getClassification"
                :loading="loading"
              >
                <el-option v-for="item in classificationList" :key="item.id" :value="item.id" :label="item.name" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="设备类别">
              <el-select v-model="listQuery.largeEqCategoryId">
                <el-option v-for="item in largeEqCategoryList" :key="item.id" :value="item.id" :label="item.name" />
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

        <el-table-column v-if="type === 1" label="地级市" prop="cityName" />
        <el-table-column v-else label="医疗机构" prop="institutionName" />

        <el-table-column label="设备台数" prop="eqNum" />
        <el-table-column label="各状态台数">
          <el-table-column label="开机台数" prop="bootNum" />
          <el-table-column label="工作台数" prop="workNum" />
        </el-table-column>
        <el-table-column label="数量利用指标">
          <el-table-column label="开机率" prop="numbootRate">
            <template slot-scope="scope">
              {{ scope.row.numbootRate | addUnit('%') }}
            </template>
          </el-table-column>
          <el-table-column label="利用率" prop="numUseRate">
            <template slot-scope="scope">
              {{ scope.row.numUseRate | addUnit('%') }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="机时利用指标">
          <el-table-column label="空转率" prop="machineTimeIdleRate">
            <template slot-scope="scope">
              {{ scope.row.machineTimeIdleRate | addUnit('%') }}
            </template>
          </el-table-column>
          <el-table-column label="利用率" prop="machineTimeUseRate">
            <template slot-scope="scope">
              {{ scope.row.machineTimeUseRate | addUnit('%') }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="功效利用指标">
          <el-table-column label="利用率" prop="effectUseRate">
            <template slot-scope="scope">
              {{ scope.row.effectUseRate | addUnit('%') }}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" prop="action" fixed="right" width="300">
          <template slot-scope="scope">
            <!-- <HButton :permission="pBenefit.exponent.efficiency" type="check" @click="handleCheckExponent(scope.row)">医疗装备效率指数查询</HButton> -->
            <HButton type="check" @click="handleCheckEfficiency(scope.row)">使用效率分析</HButton>
            <HButton type="check" @click="handleCheckPeak(scope.row)">使用高峰分析</HButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <ActionCheckExponent ref="ActionCheckExponent" />
    <ActionCheckEfficiency ref="ActionCheckEfficiency" />
    <ActionCheckPeak ref="ActionCheckPeak" />
  </div>
</template>

<script>
import { fetchKpiEffectiveness } from '@/api/benefit/exponent'
import { fetchLargeEqCategory, fetchAllCity, fetchClassification, fetchAllMechanism } from '@/api/global'
import ActionCheckExponent from './components/ActionCheckExponent'
import ActionCheckEfficiency from './components/ActionCheckEfficiency'
import ActionCheckPeak from './components/ActionCheckPeak'
import { mapGetters } from 'vuex'

export default {
  name: 'ExponentPage',
  components: { ActionCheckExponent, ActionCheckEfficiency, ActionCheckPeak },
  data() {
    return {
      listQuery: {
        type: 1,
        yearMonth: new Date(),
        cityId: '',
        institutionId: '',
        classifyId: '',
        largeEqCategoryId: ''
      },
      type: 1,
      tableData: [],
      largeEqCategoryList: [],
      cityList: [],
      institutionList: [],
      classificationList: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'pBenefit'
    ])
  },
  created() {
    this.getList()
    this.queryParamsList()
  },
  methods: {
    getList(data) {
      fetchKpiEffectiveness(this.listQuery).then(res => {
        this.type = this.listQuery.type
        this.tableData = res.data
      })
    },
    handleReset() {
      this.listQuery = {
        type: 1,
        yearMonth: new Date(),
        cityId: '',
        institutionId: '',
        classifyId: '',
        largeEqCategoryId: ''
      }
    },
    queryParamsList() {
      Promise.all([
        fetchLargeEqCategory(),
        fetchAllCity(),
        fetchAllMechanism()
      ]).then(res => {
        this.largeEqCategoryList = res[0].data
        this.cityList = res[1].data
        this.institutionList = res[2].data
      })
    },
    getClassification(query) {
      if (query !== '') {
        this.loading = true
        fetchClassification(query).then(res => {
          this.classificationList = res.data
        }).finally(() => {
          this.loading = false
        })
      }
    },
    handleCheckExponent(data) {
      const { type } = this.listQuery
      this.$refs.ActionCheckExponent.openDialog(type, { ...data.dayDetails })
    },
    handleCheckEfficiency(data) {
      const { type } = this.listQuery
      this.$refs.ActionCheckEfficiency.openDialog(type, { ...data })
    },
    handleCheckPeak(data) {
      this.$refs.ActionCheckPeak.openDialog({ ...data.dayDetails })
    }
  }
}
</script>
