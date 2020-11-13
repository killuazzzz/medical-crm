<template>
  <el-table
    ref="table"
    :data="data"
    border
    stripe
    @selection-change="handleSelectionChange"
  >
    <template v-for="col in columns">
      <el-table-column
        v-if="col.prop === 'selection'"
        :key="col.prop"
        type="selection"
        width="55"
      />
      <el-table-column
        v-else
        :key="col.prop"
        :label="col.label || ''"
        :prop="col.prop || ''"
        :align="col.align || 'left'"
        :fixed="col.fixed || false"
        :width="col.width || ''"
      >
        <template slot-scope="scope">
          <SRender v-if="typeof col.render === 'function'" :render="col.render" :scope="scope.row" />
          <span v-else-if="col.filters">{{ scope.row[col.prop] | filterItem(col.filters) }}</span>
          <span v-else>{{ scope.row[col.prop] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import SRender from './render'

export default {
  name: 'HTable',
  components: {
    SRender
  },
  props: {
    // source data
    data: {
      type: Array,
      default() {
        return []
      }
    },
    // table header config
    // prop: required
    // label: default => ''
    // align: default => left
    // fixed: default => undefined
    // width: default => undefined
    // render: default => undefined
    // filters: default => undefined
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    handleSelectionChange(rows) {
      this.$emit('hanleSelection', rows)
    }
  }
}
</script>
