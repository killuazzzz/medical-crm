<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '220px'
    },
    chartData: {
      type: Array,
      required: true
    },
    titleText: {
      type: String,
      default: ''
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
    setOptions(data = []) {
      const legendData = data.map(item => item.name)
      const seriesData = data.map(item => ({
        name: item.name,
        value: item.count
      }))
      this.chart.setOption({
        title: {
          text: this.titleText
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
          appendToBody: true
        },
        legend: {
          left: 'center',
          bottom: '0',
          data: legendData
        },
        series: [
          {
            name: this.titleText,
            type: 'pie',
            // roseType: 'radius',
            radius: ['40%', '60%'],
            center: ['50%', '45%'],
            data: seriesData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600,
            labelLine: {
              show: false
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '18',
                fontWeight: 'bold'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
