<template>
  <div>
    <el-card>
      <el-table class="mt-20" :data="tableData" border>
        <el-table-column label="设备编号" width="200" prop="deviceNumber" />
        <el-table-column label="终端代码" width="200" prop="terminalCode" />
        <el-table-column label="医疗机构名称" width="200" prop="hospitalName" />
        <el-table-column label="设备名称" prop="deviceName" />
        <el-table-column label="保持时间" prop="holdTime">
          <template slot-scope="scope">
            {{ scope.row.holdTime | secondText }}
          </template>
        </el-table-column>
        <el-table-column label="停止时间" prop="stopTime">
          <template slot-scope="scope">
            {{ scope.row.stopTime | secondText }}
          </template>
        </el-table-column>
        <el-table-column label="启动电流" prop="startingCurrent" />
        <el-table-column label="结束电流" prop="endCurrent" />
        <el-table-column label="接近距离" prop="approachDistance" />
        <el-table-column label="远离距离" prop="farDistance" />
        <el-table-column label="图像启动" prop="imageStart" />
        <el-table-column label="图像结束" prop="imageEnd" />
        <el-table-column label="重量启动" prop="weightStart" />
        <el-table-column label="重量结束" prop="weightEnd" />
        <el-table-column label="光电计数比例" width="200" prop="photoelectricProportion" />
        <el-table-column label="心跳包间隔时间" width="200" prop="heartbeatInterval">
          <template slot-scope="scope">
            {{ scope.row.heartbeatInterval | secondText }}
          </template>
        </el-table-column>
        <el-table-column label="数据包间隔时间" width="200" prop="resendInterval">
          <template slot-scope="scope">
            {{ scope.row.resendInterval | secondText }}
          </template>
        </el-table-column>
        <el-table-column label="电流上限" prop="upperCurrentLimit" />
        <el-table-column label="检查类型" prop="workType">
          <template slot-scope="scope">
            {{ scope.row.workType | workTypeText }}
          </template>
        </el-table-column>
        <el-table-column label="是否绑定设备" prop="bindEquipment">
          <template slot-scope="scope">
            {{ scope.row.bindEquipment | bindEquipmentText }}
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="action" fixed="right" width="400">
          <template slot-scope="scope">
            <HButton :permission="pTerminal.operation.update" type="update" @click="handleUpdate(scope.row)" />
            <HButton :permission="pTerminal.operation.view" type="check" @click="handleCheck(scope.row)" />
            <HButton type="bind" @click="handleBind(scope.row)" />
            <HButton type="unbind" @click="handleUnbind(scope.row)" />
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </el-card>
    <Action ref="Action" @getList="getList" />
    <ActionUpdateEquipment ref="ActionUpdateEquipment" @getList="getList" />
  </div>
</template>

<script>
import { fetchOperationList, fetchOperationUnbind } from '@/api/terminal/operation'
import Action from './components/Action'
import ActionUpdateEquipment from './components/ActionUpdateEquipment'
import { mapGetters } from 'vuex'
const workTypeList = [
  { label: '距离', value: 1 },
  { label: '图像', value: 2 },
  { label: '重量', value: 4 },
  { label: '光电计数', value: 8 }
]
const bindEquipmentList = [
  { label: '已绑定', value: true },
  { label: '未绑定', value: false }
]

export default {
  name: 'OperationPage',
  components: { Action, ActionUpdateEquipment },
  filters: {
    workTypeText(value) {
      const result = workTypeList.find(item => item.value === value)
      return result ? result.label : ''
    },
    secondText(value) {
      return value ? value + '秒' : ''
    },
    bindEquipmentText(value) {
      const result = bindEquipmentList.find(item => item.value === value)
      return result ? result.label : ''
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10
      },
      tableData: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters([
      'pTerminal'
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
      fetchOperationList(this.listQuery).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleUpdate(data) {
      this.$refs.Action.openDialog(1, { ...data })
    },
    handleCheck(data) {
      this.$refs.Action.openDialog(2, { ...data })
    },
    handleBind(data) {
      this.$refs.ActionUpdateEquipment.openDialog({
        equipmentId: data.equipmentId,
        terminalId: data.terminalId
      })
    },
    handleUnbind(data) {
      this.$confirm('确认要解绑吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { terminalId } = data
        fetchOperationUnbind(terminalId).then(res => {
          this.$message({
            type: 'success',
            message: '解绑成功'
          })
          this.getList()
        })
      })
    }
  }
}
</script>
