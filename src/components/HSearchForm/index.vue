<template>
  <el-form
    ref="formList"
    :model="listQuery"
    name="listQuery"
    label-width="100px"
    label-position="left"
  >
    <el-row :gutter="20">
      <template v-for="formItem in formItems">
        <el-col :key="formItem.key" :lg="8" :xl="6">
          <el-form-item :label="formItem.label" :label-position="formItem.labelPosition ? formItem.labelPosition : '100px'">

            <template v-if="formItem.type === 'select' && formItem.selectList">
              <el-select v-model="listQuery[formItem.key]">
                <el-option v-for="item in formItem.selectList" :key="item[formItem.selectValue]" :value="item[formItem.selectValue]" :label="item[formItem.selectLabel]" />
              </el-select>
            </template>

            <template v-if="formItem.type === 'input'">
              <el-input v-model="listQuery[formItem.key]" />
            </template>

            <template v-if="formItem.type === 'date'">
              <el-date-picker
                v-model="listQuery[formItem.key]"
                :type="formItem.dateType ? formItem.dateType : 'date'"
                placeholder="选择日期"
                :format="formItem.dateFormat ? formItem.dateFormat : 'yyyy-MM-dd'"
                :value-format="formItem.dateFormat ? formItem.dateFormat : 'yyyy-MM-dd'"
              />
            </template>

          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: 'HSearchForm',
  props: {
    listQuery: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array,
      required: true
    }
  }
}
</script>
