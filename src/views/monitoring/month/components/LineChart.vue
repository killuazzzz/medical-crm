<template>

  <div :class="className" :style="{height:height,width:width}" />

</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import resize from '@/views/dashboard/components/mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    setOptions(chartData = {}) {
      const xData = chartData.map(item => `${item.day}日`)
      const workTimeData = chartData.map(item => item.workTime)
      const standbyTimeData = chartData.map(item => item.standbyTime)
      const shutdownTimeData = chartData.map(item => item.shutdownTime)
      const offlineTimeData = chartData.map(item => item.offlineTime)
      this.chart.setOption({
        title: {
          text: '设备运行时长统计(日报表)',
          textStyle: {
            fontSize: '18',
            color: '#333'
          }
        },
        xAxis: {
          data: xData,
          axisTick: {
            show: false
          },
          axisLabel: {
            inside: false,
            interval: 0
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 50,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['工作时长', '待机时长', '关机时长', '离线']
        },
        series: [
          {
            name: '工作时长',
            smooth: true,
            type: 'line',
            data: workTimeData,
            animationDuration: 1000,
            animationEasing: 'cubicInOut'
          },
          {
            name: '待机时长',
            smooth: true,
            type: 'line',
            data: standbyTimeData,
            animationDuration: 1000,
            animationEasing: 'cubicInOut'
          },
          {
            name: '关机时长',
            smooth: true,
            type: 'line',
            data: shutdownTimeData,
            animationDuration: 1000,
            animationEasing: 'cubicInOut'
          },
          {
            name: '离线',
            smooth: true,
            type: 'line',
            data: offlineTimeData,
            animationDuration: 1000,
            animationEasing: 'cubicInOut'
          }
        ]
      })
    }
  }
}
</script>
