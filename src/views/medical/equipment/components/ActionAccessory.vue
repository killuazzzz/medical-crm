<template>
  <el-dialog
    title="附属设备"
    :visible.sync="dialogVisible"
    width="80%"
    :close-on-click-modal="false"
    @close="closeEvent"
  >
    <HButton :permission="pMedical.equipment.addSubs" type="add" @click="handleAdd" />
    <el-table class="mt-20" :data="tableData">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="运输与存储要求">
              <span>{{ props.row.claim }}</span>
            </el-form-item>
            <el-form-item label="创建人">
              <span>{{ props.row.createUserName }}</span>
            </el-form-item>
            <el-form-item label="生产商">
              <span>{{ props.row.manufacturer }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="供应商">
              <span>{{ props.row.supplier }}</span>
            </el-form-item>
            <el-form-item label="配套用途">
              <span>{{ props.row.supportingUses }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="附属设备" prop="eqName" />
      <el-table-column label="规格" prop="specification" />
      <el-table-column label="原值" prop="originalValue" />
      <el-table-column label="购置日期" prop="purchaseDate" />
      <el-table-column label="出厂日期" prop="productionDate" />
    </el-table>
    <div slot="footer">
      <el-button @click="handleCancel">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 认</el-button>
    </div>
    <ActionAccessoryAdd ref="ActionAccessoryAdd" @getList="getList" />
  </el-dialog>
</template>
<script>
import { fetchEquipmentAccessoryList } from '@/api/medical/equipment'
import ActionAccessoryAdd from './ActionAccessoryAdd'
import { mapGetters } from 'vuex'

export default {
  name: 'ActionAccessory',
  components: { ActionAccessoryAdd },
  data() {
    return {
      dialogVisible: false,
      formList: {},
      rules: {},
      tableData: [],
      id: null
    }
  },
  computed: {
    ...mapGetters([
      'pMedical'
    ])
  },
  methods: {
    openDialog(data) {
      this.dialogVisible = true
      this.id = data
      this.getList()
    },
    closeEvent() {
    },
    handleCancel() {
      this.dialogVisible = false
    },
    handleConfirm() {
      this.dialogVisible = false
    },
    getList() {
      fetchEquipmentAccessoryList(this.id).then(res => {
        this.tableData = res.data
      })
    },
    handleAdd() {
      this.$refs.ActionAccessoryAdd.openDialog(this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
