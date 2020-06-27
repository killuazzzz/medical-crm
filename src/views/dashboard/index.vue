<template>
  <div class="dashboard-container">
    <DashboardAdmin v-if="checkPermission(pDashboard.amdinPanel)" />
    <el-card v-else style="textAlign: center;">
      <p style="fontSize: 18px;fontWeight: 600;">欢迎回来，您还没有获得首页的权限，请联系管理员。</p>
      <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
    </el-card>
  </div>
</template>

<script>
import DashboardAdmin from './admin'
import { mapGetters } from 'vuex'
import errGif from '@/assets/401_images/401.gif'

export default {
  name: 'Dashboard',
  components: { DashboardAdmin },
  data() {
    return {
      errGif: errGif + '?' + +new Date()
    }
  },
  computed: {
    ...mapGetters([
      'pDashboard'
    ])
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
</style>
