<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="设备名称">
              <el-input v-model="listQuery.eqName	" />
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
            <el-form-item label-width="0px">
              <HButton type="search" @click="getList(1)" />
              <HButton type="reset" @click="handleReset" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <HButton :permission="pMedical.equipment.add" type="add" @click="handleAdd">新增设备</HButton>
      </el-row>
      <el-table class="mt-20" :data="tableData" border>
        <el-table-column align="center" show-overflow-tooltip label="序号" prop="id" />
        <el-table-column align="center" show-overflow-tooltip label="设备名称" prop="eqName" />
        <el-table-column align="center" show-overflow-tooltip label="规格型号" prop="model">
          <template slot-scope="scope">
            {{ scope.row.specs }} {{ scope.row.model }}
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="原值" prop="originalValue" />
        <el-table-column align="center" show-overflow-tooltip label="启用日期" prop="activationDate">
          <template slot-scope="scope">
            {{ scope.row.activationDate | parseTime('{y}-{m}-{d}') }}
          </template>
        </el-table-column>
        <el-table-column align="center" show-overflow-tooltip label="机构名称" prop="institutionName" />
        <el-table-column align="center" show-overflow-tooltip label="院内编码" prop="inHospitalCode" />
        <el-table-column align="center" show-overflow-tooltip label="分类编码" prop="classificationCode" />
        <el-table-column align="center" show-overflow-tooltip label="产地" prop="area" />
        <el-table-column align="center" show-overflow-tooltip label="供应商" prop="supplier" />
        <el-table-column align="center" label="操作" prop="action" fixed="right" width="440">
          <template slot-scope="scope">
            <HButton :permission="pMedical.equipment.update" type="update" @click="handleUpdate(scope.row)" />
            <HButton :permission="pMedical.equipment.view" type="check" @click="handleCheck(scope.row)" />
            <HButton :permission="pMedical.equipment.subs" type="check" @click="handleAccessoryCheck(scope.row)">附属设备</HButton>
            <HButton :permission="pMedical.equipment.material" type="check" @click="handleConsumablesCheck(scope.row)">耗材信息</HButton>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <Action ref="Action" @getList="getList" />
    <ActionAccessory ref="ActionAccessory" />
    <ActionConsumables ref="ActionConsumables" />
  </div>
</template>

<script>
import { fetchEquipmentList } from '@/api/medical/equipment'
import { fetchLargeEqCategory } from '@/api/global'
import ActionAccessory from './components/ActionAccessory'
import ActionConsumables from './components/ActionConsumables'
import Action from './components/Action'
import { mapGetters } from 'vuex'

export default {
  name: 'EquipmentPage',
  components: { ActionAccessory, ActionConsumables, Action },
  data() {
    return {
      name: 'hanhui',
      listQuery: {
        page: 1,
        limit: 10,
        eqName: '',
        largeEqCategory: ''
      },
      tableData: [],
      total: 0,
      largeEqCategoryList: []
    }
  },
  computed: {
    ...mapGetters([
      'pMedical'
    ])
  },
  created() {
    this.getList()
    this.getLargeEqCategoryList()
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
      fetchEquipmentList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        eqName: '',
        largeEqCategory: ''
      }
    },
    getLargeEqCategoryList() {
      fetchLargeEqCategory().then(res => {
        this.largeEqCategoryList = res.data
      })
    },
    handleAdd() {
      this.$refs.Action.openDialog(0)
    },
    handleUpdate(data) {
      this.$refs.Action.openDialog(1, { ...data })
    },
    handleCheck(data) {
      this.$refs.Action.openDialog(2, { ...data })
    },
    handleAccessoryCheck(data) {
      this.$refs.ActionAccessory.openDialog(data.id)
    },
    handleConsumablesCheck(data) {
      this.$refs.ActionConsumables.openDialog(data.id)
    }
  }
}
</script>
