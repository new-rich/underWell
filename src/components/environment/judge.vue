<template>
  <div class="main">
    <div class="title">
      <span>安全情况智能评判</span>
    </div>

    <div class="query">
      <div class="text">
        评判报告：
      </div>
      <div class="select">
        <el-select v-model="query_type" class="m-2" placeholder="实时数据" size="large" @change="currStationChange">
          <el-option
              v-for="item in query_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="demo-date-picker" v-show="time_show">
        <div class="block">
          <el-date-picker
              v-model="value2"
              type="daterange"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="截止日期"
              :shortcuts="shortcuts"
              size="large"
          />
        </div>
      </div>
      <el-button plain style="margin-left: 3%;width: 5%;height: 50%;font-size: 18px;">重置</el-button>
      <el-button type="primary" :icon="Search" style="margin-left: 3%;width: 5%;height: 50%;font-size: 18px;">查询</el-button>
    </div>
    <div class="chart">
      <div class="chartPlace" id="scorechart">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "judge",
  data(){
    return{
      time_show : false,
    }
  },
  methods:{
    currStationChange(val) {
      if (val == "realtime") {
        this.time_show = false;
      } else {
        this.time_show = true;
      }
    },
    initchart(){
      var scorechart = echarts.init(document.getElementById('scorechart'));
      var scoreOption =  {
        title:{
          text:'智能风险研判图',
          textStyle: {
            fontSize: 24,
            fontStyle: 'normal',
          },
        },
        color: ['rgba(17, 255, 163, 0.32)', 'rgba(255, 91, 91, 0.64)'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          bottom: 45,
          data: ['最高得分','当前得分'],
          textStyle:{
            color:"#496174",
            fontSize: 14,
            fontFamily:"Adobe Heiti Std",
          },
        },
        radar: [
          {
            indicator: [
              {text: '空气指标'},
              {text: '风指标'},
              {text: '水指标'},
              {text: '低压指标'},
              {text: '电指标'}
            ],
            radius: '60%',
            nameGap:18,
            center:['50%','40%'],
            padding:[0,0,10,10],
            name:{
              textStyle:{
                fontSize:"16",
                fontFamily:"Adobe Heiti Std",
              }
            }
          }
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            areaStyle: {},
            data: [
              {
                value: [5, 5, 5, 5,5],

                name: '最高得分',
                symbol: 'rect',
                symbolSize: 8,
                lineStyle: {
                  type: 'dashed'
                },
                label: {
                  show: false,
                  textStyle:{
                    color: "rgba(252, 251, 255, 0.7)",
                    fontSize:"10",
                    fontFamily:"Adobe Heiti Std",
                  },
                  formatter: function (params) {
                    return params.value;
                  }
                },
              },
              {
                value: [4.42, 4.76, 5, 3.28,5],
                name: '当前得分',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                    {
                      color: 'rgba(255, 91, 91, 0.64)',
                      offset: 0
                    },
                    {
                      color: 'rgba(255, 91, 91, 0.90)',
                      offset: 1
                    }
                  ])
                },
                label: {
                  show: true,
                  textStyle:{
                    color: "#000",
                    fontSize:"12",
                    fontFamily:"Adobe Heiti Std",
                  },
                  formatter: function (params) {
                    return params.value;
                  }
                },
              },
            ]
          }
        ],
      };
      scorechart.setOption(scoreOption);
    }
  },
  mounted() {
    this.initchart()
  }
}
</script>

<script setup>
import {
  Search,
  Download,
  CirclePlus
} from '@element-plus/icons-vue'
import {ref} from "vue";

const query_type = ref('')
const value3 = ref('')
const query_type_list = [
  {
    value: 'realtime',
    label: '实时数据',
  },
  {
    value: 'history',
    label: '历史数据',
  },
]

const value1 = ref('')
const value2 = ref('')
const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]


</script>

<style lang='scss' scoped>

.el-scrollbar__view{
  display: inline !important;
}
.main{
  width:100%;
  height:100%;
  background-color: #f3f4f9;

  .title {
    width: 100%;
    height: 8%;

    span {
      color: #496174;
      float: left;
      font-size: 28px;
      font-weight: bold;
      margin-left: 10px;
      line-height: 50px;
    }
  }

  .query{
    position: relative;
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 8%;
    border-radius: 8px;
    margin-bottom: 20px;

    .text{
      margin-left: 2%;
      font-size: 18px;
    }

    .select{
      width: 15%;
      height: 60%;
      margin-left: 2%;
      margin-top: 5px;

      .el-select{
        width: 100%;
        height: 100%;
        font-size: 16px;
      }
    }

    .demo-date-picker {
      display: flex;
      width: 30%;
      height: 60%;
      padding: 0;
      flex-wrap: wrap;
      .block {
        text-align: center;
        flex: 1;
      }
    }

  }


  .chart{
    background: #fff;
    border-radius: 8px;
    height: 85%;
    margin-top: 2%;

    span{
      float: left;
      margin-left: 1%;
      margin-top: 1%;
      font-size: 18px;
      font-weight: 600;
      height: 5%;
      width: 8%;
    }

    .chartPlace{
      height: 80%;
      width: 90%;
      margin-left: 5%;
      padding-top: 5%;
    }
  }

}
</style>