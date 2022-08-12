<template>
  <div class="main">
    <div class="title">
      <span>数据统计分析</span>
    </div>
    <div class="upRow">
      <div class="leftChart" id="partChart">
      </div>
      <div class="rightChart" id="alarmChart">

      </div>
    </div>
    <div class="downRow">
      <div class="leftPanel" id="personChart">

      </div>
      <div class="rightPanel" id="timeChart">

      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "analysis",
  data(){
    return{

    }
  },
  mounted() {
    this.initPart();
    this.initAlarm();
    this.initPerson();
    this.initTime();
  },
  methods:{
    initPart(){
      echarts.dispose(document.getElementById('partChart'))
      var partChart = echarts.init(document.getElementById('partChart'));
      var partOption = {
        title: {
          text: '区域分析',
          textStyle:{
            fontSize:24
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '5%',
          right: '4%',
          bottom: '3%',
          top:'10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['全部', '-180m中段', '-120m中段', '-60m中段']
        },
        series: [
          {
            name: '矿工',
            type: 'bar',
            data: [23, 4, 8, 7, 4]
          },
          {
            name: '领班',
            type: 'bar',
            data: [11, 2, 2, 3, 4]
          },
          {
            name: '矿场领导',
            type: 'bar',
            data: [4, 1, 1, 1, 1]
          },
          {
            name: '县、市及以上领导',
            type: 'bar',
            data: [3, 1, 1, 0, 1]
          }
        ]
      };
      partChart.setOption(partOption);
    },

    initAlarm(){
      echarts.dispose(document.getElementById('alarmChart'))
      var alarmChart = echarts.init(document.getElementById('alarmChart'));
      var alarmOption = {
        title: {
          text: '报警分析',
          textStyle:{
            fontSize:24
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'10%',
          containLabel: true
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        xAxis: {
          type: 'category',
          data: ['低风险', '中风险', '高风险', '极高风险']
        },
        series: [
          {
            name: '气体',
            type: 'bar',
            data: [4, 8, 7, 2]
          },
          {
            name: '人员',
            type: 'bar',
            data: [ 2, 2, 3, 1]
          },
          {
            name: '用电',
            type: 'bar',
            data: [ 2, 3, 1, 1]
          },
          {
            name: '其他',
            type: 'bar',
            data: [ 4, 3, 0, 0]
          }
        ]
      };
      alarmChart.setOption(alarmOption);
    },

    initPerson(){
      echarts.dispose(document.getElementById('personChart'))
      var personChart = echarts.init(document.getElementById('personChart'));
      var personOption = {
        title: {
          text: '井下人员统计',
          textStyle:{
            fontSize:24
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['矿工', '领班', '矿场领导', '县、市及以上领导']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top:'10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2022-06-21', '2022-06-22', '2022-06-23', '2022-06-24',
            '2022-06-25', '2022-06-26', '2022-06-27',
            '2022-06-28','2022-06-29','2022-06-30']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '矿工',
            type: 'line',
            data: [23, 21, 17, 25, 25, 24, 19, 25, 24, 19],
            smooth: true
          },
          {
            name: '领班',
            type: 'line',
            data: [11, 9, 11, 11, 8, 13, 10,13,10,10],
            smooth: true
          },
          {
            name: '矿场领导',
            type: 'line',
            data: [4, 4, 4, 4, 3, 4, 4, 3,4,4],
            smooth: true
          },
          {
            name: '县、市及以上领导',
            type: 'line',
            data: [3, 3, 2, 3, 3, 3, 3, 3, 3, 3],
            smooth: true
          },
        ]
      };
      personChart.setOption(personOption);
    },

    initTime(){
      echarts.dispose(document.getElementById('timeChart'))
      var timeChart = echarts.init(document.getElementById('timeChart'));
      var timeOption = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: '每日时长',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '32',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 32, name: '0-100小时' },
              { value: 12, name: '100-200小时' },
              { value: 9, name: '200-300小时' },
            ]
          }
        ]
      };
      timeChart.setOption(timeOption);
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
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

  .upRow{
    width: 100%;
    height:45%;
    margin-top: 1%;
    display: flex;

    .leftChart{
      height: 100%;
      width: 55%;
      background-color: white;
      border-radius: 10px;

    }

    .rightChart{
      height: 100%;
      width: 45%;
      margin-left: 1%;
      background-color: white;
      border-radius: 10px;
    }
  }

  .downRow{
    width: 100%;
    height:45%;
    margin-top: 1%;
    display: flex;
    .leftPanel{
      height: 100%;
      width: 50%;
      background-color: white;
      border-radius: 10px;
    }
    .rightPanel{
      height: 100%;
      width: 50%;
      margin-left: 1%;
      background-color: white;
      border-radius: 10px;
    }
  }
}

</style>