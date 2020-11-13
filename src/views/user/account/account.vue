<template>
  <div>
    <el-card>
      <el-form ref="formList" :model="listQuery" name="listQuery" label-width="60px" label-position="left">
        <el-row :gutter="20">
          <el-col :lg="8" :xl="6">
            <el-form-item label="账号">
              <el-input v-model="listQuery.likeAccount" />
            </el-form-item>
          </el-col>
          <el-col :lg="8" :xl="6">
            <el-form-item label="姓名">
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
      <el-row type="flex">
        <HButton :permission="pUser.account.add" type="add" @click="handleAdd">新增用户</HButton>
        <el-upload
          v-if="checkPermission(pUser.account.uploadExcel)"
          ref="uploadComponent"
          class="ml-10"
          :action="uploadAccountUrl"
          :headers="uploadHeader"
          accept="excel"
          :show-file-list="false"
          :limit="1"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
        >
          <HButton type="upload">上传Excel</HButton>
        </el-upload>
        <HButton :permission="pUser.account.downloadExcel" class="ml-10" type="download" @click="handleDownload">下载Excel模板</HButton>
      </el-row>
      <el-table class="mt-20" :data="tableData" border stripe>
        <el-table-column align="center" show-overflow-tooltip label="账号" prop="account" />
        <el-table-column align="center" show-overflow-tooltip label="所属科室名称" prop="departmentName" />
        <el-table-column align="center" show-overflow-tooltip label="所属医疗机构名称" prop="orgName" />
        <el-table-column align="center" show-overflow-tooltip label="用户名称" prop="userName" />
        <el-table-column align="center" show-overflow-tooltip label="角色名称" prop="roleName" />
        <el-table-column align="center" show-overflow-tooltip label="操作" prop="action" width="400">
          <template slot-scope="scope">
            <HButton :permission="pUser.account.updateRole" type="update" @click="handleRole(scope.row)">编辑角色</HButton>
            <HButton :permission="pUser.account.updateDepartment" type="update" @click="handleDepartment(scope.row)">编辑科室</HButton>
            <HButton :permission="pUser.account.updateOrg" type="update" @click="handleMechanism(scope.row)">编辑医疗机构</HButton>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <ActionUpdateRole ref="ActionUpdateRole" @getList="getList" />
    <ActionAdd ref="ActionAdd" @getList="getList" />
    <ActionUpdateDepartment ref="ActionUpdateDepartment" @getList="getList" />
    <ActionUpdateMechanism ref="ActionUpdateMechanism" @getList="getList" />
  </div>
</template>

<script>
import { fetchAccountList, uploadAccountUrl, downloadAccountUrl } from '@/api/user/account'
import ActionUpdateRole from './components/ActionUpdateRole'
import ActionAdd from './components/ActionAdd'
import ActionUpdateDepartment from './components/ActionUpdateDepartment'
import ActionUpdateMechanism from './components/ActionUpdateMechanism'
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
const baseApi = process.env.VUE_APP_BASE_API

export default {
  name: 'AccountPage',
  components: { ActionUpdateRole, ActionAdd, ActionUpdateDepartment, ActionUpdateMechanism },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        likeAccount: '',
        likeName: ''
      },
      tableData: [],
      total: 0,
      downloadAccountUrl: baseApi + downloadAccountUrl,
      uploadAccountUrl: baseApi + uploadAccountUrl,
      uploadHeader: {
        'http-token': getToken()
      }
    }
  },
  computed: {
    ...mapGetters([
      'pUser'
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
      fetchAccountList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleReset() {
      this.listQuery = {
        page: 1,
        limit: 10,
        likeAccount: '',
        likeName: ''
      }
    },
    handleAdd() {
      this.$refs.ActionAdd.openDialog()
    },
    handleRole(data) {
      this.$refs.ActionUpdateRole.openDialog({ ...data })
    },
    handleDepartment(data) {
      this.$refs.ActionUpdateDepartment.openDialog({ ...data })
    },
    handleMechanism(data) {
      this.$refs.ActionUpdateMechanism.openDialog({ ...data })
    },
    handleDownload() {
      const aTag = document.createElement('a')
      aTag.href = this.downloadAccountUrl
      aTag.download = ''
      aTag.click()
    },
    handleUploadSuccess(res, file, fileList) {
      if (res.code !== 'AA000000') {
        this.$message({
          message: res.msg || 'Error',
          type: 'error'
        })
      } else {
        this.$message({
          type: 'success',
          message: '上传成功！'
        })
      }
      this.$refs.uploadComponent.clearFiles()
    },
    handleUploadError(err, file, fileList) {
      this.$message({
        message: err.msg || 'Error',
        type: 'error'
      })
    }
  }
}
</script>
