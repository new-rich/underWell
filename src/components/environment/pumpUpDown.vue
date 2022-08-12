<template>
  <div class="main">
    <div class="title">
      <span>水泵启停状态</span>
    </div>

    <div class="query">
      <div class="text">
        数据检索：
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
      <div class="select">
        <el-select v-model="pump_id" class="m-2" placeholder="水泵#1" size="large">
          <el-option
              v-for="item in pump_id_list"
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
      <div class="chartPlace" id="pumpchart">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "pumpUpDown",
  data(){
    return{
      time_show : false,
      data1 : [
        {
          value: [0, 0, 1.8],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [0, 1.8, 8.2],
          itemStyle: { color: '#00BFFF' },
        },
        {
          value: [0, 8.2, 16.1],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [0, 16.1, 19.3],
          itemStyle: { color: '#00BFFF' },
        },
        {
          value: [0, 19.3, 24],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [1, 0, 3.2],
          itemStyle: { color: '#00BFFF' },
        },
        {
          value: [1, 3.2, 10.2],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [1, 10.2, 12.1],
          itemStyle: { color: '#00BFFF' },
        },
        {
          value: [1, 12.1, 24],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [2, 0, 5.8],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [2, 5.8, 7.2],
          itemStyle: { color: '#FF0000' },
        },
        {
          value: [2, 7.2, 14.1],
          itemStyle: { color: '#1abc9c' },
        },
        {
          value: [2, 14.1, 16.3],
          itemStyle: { color: '#00BFFF' },
        },
        {
          value: [2, 16.3, 24],
          itemStyle: { color: '#1abc9c' },
        },
      ],
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

    renderItem(params, api) {
      // 数据格式 [2, 3, 4]
      // 2为y轴索引
      const categoryIndex = api.value(0);
      // 3,4为矩形起始 末尾坐标
      const start = api.coord([api.value(1), categoryIndex]);
      const end = api.coord([api.value(2), categoryIndex]);
      const height = api.size([0, 1])[1] * 0.2;

      const rectShape = echarts.graphic.clipRectByRect(
          {
            x: start[0],
            y: start[1] - height / 2,
            width: end[0] - start[0],
            height,
          },
          {
            x: params.coordSys.x,
            y: params.coordSys.y,
            width: params.coordSys.width,
            height: params.coordSys.height,
          }
      );

      return (
          rectShape && {
            type: 'rect',
            transition: ['shape'],
            shape: rectShape,
            style: api.style(),
          }
      );
    },


    initchart(){
      var pumpchart = echarts.init(document.getElementById('pumpchart'));
      var pumpOption =  {
        title:{
          text:'水泵工作启停状态',
          left: 'center'
        },
        legend: {},
        tooltip: {
          formatter:function (params) { //在此处直接用 formatter 属性
            console.log(params.value[0])  // 打印数据
          }
        },
        dataZoom: [
          {
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            labelFormatter: '',
          },
          {
            type: 'inside',
            filterMode: 'weakFilter',
          },
        ],
        grid: {
          // height: 300,
          // bottom: 100
          top: '4%',
          right: '2%',
        },
        xAxis: {
          type: 'value',
          min: 0,
          max: 24,
          scale: true,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          data: ['水泵#1', '水泵#2','水泵#3'],
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: { show: false },
        },
        series: [
          // 矩形
          {
            type: 'custom',
            renderItem: this.renderItem,
            yAxisIndex: 0,
            itemStyle: {
              opacity: 0.8,
            },
            encode: {
              x: [-1] // 使其不受datazoom控制
            },
            data: this.data1,
          }
        ]
      };
      pumpchart.setOption(pumpOption);
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
const fan_id = ref('')
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
const pump_id_list = [
  {
    value: '1',
    label: '水泵#1',
  },
  {
    value: '2',
    label: '水泵#2',
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