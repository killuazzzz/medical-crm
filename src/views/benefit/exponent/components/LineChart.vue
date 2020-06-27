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
      type: Object,
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
      console.log(chartData)
      const xData = Object.keys(chartData)
      const data = Object.values(chartData)
      this.chart.setOption({
        title: {
          text: '',
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
          bottom: 10,
          top: 10,
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
        // legend: {
        //   data: ['工作时长', '待机时长', '关机时长', '离线']
        // },
        series: [
          {
            name: '',
            smooth: true,
            type: 'line',
            data: data,
            animationDuration: 1000,
            animationEasing: 'cubicInOut'
          }
        ]
      })
    }
  }
}
</script>
