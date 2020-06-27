<template>
  <div v-loading="loading">
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="选择地区">
              <el-cascader
                v-model="cityValue"
                :options="cityOptions"
                :props="{
                  label: 'name',
                  value: 'id',
                  children: 'districtCountyVos'
                }"
                @change="handleChange"
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
      <el-row>
        <HButton :permission="pUser.mechanism.add" type="add" @click="handleAdd" />
      </el-row>
      <el-table class="mt-20" :data="tableData" border>
        <el-table-column label="区域编号" prop="cityId" />
        <el-table-column label="医疗机构名称" prop="institutionName" />
        <el-table-column label="医疗机构执业证号" prop="licenseCode" />
        <el-table-column label="联系人" prop="principal" />
        <el-table-column label="负责人电话" prop="contactPhone" />
        <el-table-column label="医疗机构地址" prop="hospitalAddress" />
        <el-table-column label="操作" fixed="right" min-width="200" prop="action">
          <template slot-scope="scope">
            <HButton :permission="pUser.mechanism.update" type="update" @click="handleUpdate(scope.row)" />
            <HButton :permission="pUser.mechanism.view" type="check" @click="handleCheck(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <Action ref="action" @getList="getList" />
  </div>
</template>

<script>
import { fetchMechanismList, fetchMechanismDel } from '@/api/user/mechanism'
import { fetchRegion } from '@/api/global'
import Action from './components/Action'
import { mapGetters } from 'vuex'

export default {
  name: 'Mechanism',
  components: { Action },
  data() {
    return {
      loading: false,
      listQuery: {
        page: 1,
        limit: 10,
        districtCountyId: '',
        cityId: ''
      },
      tableData: [],
      total: 0,
      cityValue: [],
      cityOptions: []
    }
  },
  computed: {
    ...mapGetters([
      'pUser'
    ])
  },
  created() {
    this.getList()
    this.getRegio()
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
      this.loading = true
      fetchMechanismList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    getRegio() {
      fetchRegion().then(res => {
        this.cityOptions = res.data
      })
    },
    handleAdd() {
      this.$refs.action.openDialog(0)
    },
    handleUpdate(data) {
      this.$refs.action.openDialog(1, { ...data })
    },
    handleCheck(data) {
      this.$refs.action.openDialog(2, { ...data })
    },
    handleDel(data) {
      this.$confirm('确认要删除此项吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        fetchMechanismDel(data.id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        districtCountyId: '',
        cityId: ''
      }
      this.cityValue = []
    },
    handleChange(value) {
      this.listQuery.districtCountyId = value[0] || ''
      this.listQuery.cityId = value[1] || ''
    }
  }
}
</script>
