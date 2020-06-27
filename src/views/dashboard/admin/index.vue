<template>
  <div>
    <el-row type="flex" :gutter="20">
      <el-col :span="12">
        <el-card>
          <BarChart :chart-data="largeEqCategoryMsgVos" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card style="height: 100%;overflow: visible">
          <div class="summary">全省大型设备<span style="font-size: 26px;">{{ totalEquipment }}</span>台 资产总价值<span style="font-size: 26px;">{{ totalOriginalValue }}</span></div>
          <el-row type="flex" :gutter="20">
            <el-col>
              <el-card style="overflow: visible">
                <PieChart :chart-data="pieEquipmentVos" :title-text="'甲乙类占比'" />
              </el-card>
            </el-col>
            <el-col>
              <el-card style="overflow: visible">
                <PieChart :chart-data="pieMechanismVos" :title-text="'医疗机构总量比'" />
              </el-card>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col v-for="item in cityMsgVos" :key="item.cityId" class="mt-20" style="width: 12.5%">
        <el-card class="city" shadow="hover" :body-style="{ padding: '0px' }">
          <div class="header">
            {{ item.name }}
          </div>
          <div class="body">
            <p>设备总量: {{ item.equipmentCount }}</p>
            <p>设备总值:</p>
            <p>{{ item.originalValueCount }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchHomeShow } from '@/api/dashboard'
import BarChart from './../components/BarChart'
import PieChart from './../components/PieChart'

export default {
  name: 'DashboardAdmin',
  components: { BarChart, PieChart },
  data() {
    return {
      largeEqCategoryMsgVos: [],
      barData: [],
      barLabel: [],
      totalEquipment: '',
      totalOriginalValue: '',
      pieEquipmentVos: [],
      pieMechanismVos: [],
      cityMsgVos: []
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      fetchHomeShow().then(res => {
        const {
          largeEqCategoryMsgVos,
          totalEquipment,
          totalOriginalValue,
          pieEquipmentVos,
          pieMechanismVos,
          cityMsgVos
        } = res.data
        this.largeEqCategoryMsgVos = largeEqCategoryMsgVos
        this.barData = largeEqCategoryMsgVos.map(item => item.count)
        this.barLabel = largeEqCategoryMsgVos.map(item => item.name)
        this.totalEquipment = totalEquipment
        this.totalOriginalValue = totalOriginalValue
        this.pieEquipmentVos = pieEquipmentVos
        this.pieMechanismVos = pieMechanismVos
        this.cityMsgVos = cityMsgVos
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.summary {
  padding: 0 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  text-align: center;
  background-color: #4daeb3;
  color: #fff;
  line-height: 50px;
  font-size: 24px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  box-shadow: 0 2px 12px 0 #4daeb3;
}
.city {
  &:hover {
    transform: scale(1.1);
  }
  .header {
    text-align: center;
    font-size: 20px;
    color: #fff;
    background-color: #6bd7bd;
    line-height: 40px;
    font-weight: bold;
  }
  .body {
    padding: 10px;
    color: #fff;
    background-color: #273f52;
  }
}
</style>
