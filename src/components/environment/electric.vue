<template>
  <div class="main">
    <div class="title">
      <span>企业用电量</span>
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
        <el-select v-model="ele_id" class="m-2" placeholder="电表#1" size="large">
          <el-option
              v-for="item in ele_id_list"
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
      <span>单位：度</span>
      <div class="chartPlace" id="elechart">
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "electric",
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
      var elechart = echarts.init(document.getElementById('elechart'));
      var eleOption =  {
        legend: {
          data: ['用电量']
        },
        xAxis: {
          type: 'category',
          data: ['2022-06-21', '2022-06-22', '2022-06-23', '2022-06-24',
            '2022-06-25', '2022-06-26', '2022-06-27',
            '2022-06-28','2022-06-29','2022-06-30'],
          axisLabel: {
            show: true,
            textStyle: {
              color: "#a9a9a9", //更改坐标轴文字颜色
              fontSize: 14 //更改坐标轴文字大小
            },
          },
        },
        tooltip: {
          trigger: 'axis'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'用电量',
            data: [32.5, 33.1, 36.9, 32.1, 31.6, 34.3, 35.3,31.2, 31.1, 36.4],
            type: 'line',
            areaStyle: {}
          }
        ]
      };
      elechart.setOption(eleOption);
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
const ele_id = ref('')
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
const ele_id_list = [
  {
    value: '1',
    label: '电表#1',
  },
  {
    value: '2',
    label: '电表#2',
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

const preData = [
  {

  },
  {

  },
  {

  },
  {

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