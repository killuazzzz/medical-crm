<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="100px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="角色名">
              <el-input v-model="listQuery.likeName" />
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
        <HButton :permission="pSystem.role.add" type="add" @click="handleAdd">新增角色</HButton>
      </el-row>
      <el-table class="mt-20" :data="tableData" border>
        <el-table-column label="角色名" prop="name" />
        <el-table-column label="创建日期" prop="createTime" />
        <el-table-column label="操作" prop="action">
          <template slot-scope="scope">
            <HButton :permission="pSystem.role.updateMenu" type="update" @click="handleRole(scope.row.id)">编辑菜单权限</HButton>
            <HButton :permission="pSystem.role.updateData" type="update" @click="handleDataScope(scope.row)">编辑数据权限</HButton>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <ActionAdd ref="ActionAdd" @getList="getList" />
    <ActionRole ref="ActionRole" @getList="getList" />
    <ActionDataScope ref="ActionDataScope" @getList="getList" />
  </div>
</template>

<script>
import { fetchRoleList } from '@/api/system/role'
import ActionAdd from './components/ActionAdd'
import ActionRole from './components/ActionRole'
import ActionDataScope from './components/ActionDataScope'
import { mapGetters } from 'vuex'

export default {
  name: 'Role',
  components: { ActionAdd, ActionRole, ActionDataScope },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        hide: false,
        roleType: 2,
        likeName: ''
      },
      tableData: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'pSystem'
    ])
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
      fetchRoleList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleAdd() {
      this.$refs.ActionAdd.openDialog()
    },
    handleRole(id) {
      this.$refs.ActionRole.openDialog(id)
    },
    handleDataScope(data) {
      this.$refs.ActionDataScope.openDialog({ ...data })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        hide: false,
        roleType: 2,
        likeName: ''
      }
    }
  }
}
</script>
