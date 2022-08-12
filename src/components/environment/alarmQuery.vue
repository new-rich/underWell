<template>
  <div class="main">
    <div class="title">
      <span>历史数据查询</span>
    </div>

    <div class="query">
      <div class="text">
        数据检索：
      </div>
      <div class="select">
        <el-select v-model="query_type" class="m-2" placeholder="所有数据" size="large" @change="currStationChange">
          <el-option
              v-for="item in query_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </div>
      <div class="select">
        <el-select v-model="device_name" class="m-2" placeholder="氧气#1" size="large" v-show="name_show">
          <el-option
              v-for="item in device_name_list"
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
    <div class="control">
      <el-button type="primary" :icon="Download" style="width: 5%;height: 80%;float: left;margin-top: 5px">导出</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border size="large">
        <el-table-column fixed prop="alarmID" label="报警信息ID" min-width="2">
          <!--          <template #default="scope">-->
          <!--            <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
          <!--              <template #reference>-->
          <!--                <el-tag>{{ scope.row.number }}</el-tag>-->
          <!--              </template>-->
          <!--            </el-popover>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column prop="alarm_type" label="报警类别" min-width="2" />
        <el-table-column prop="device_id" label="测量设备ID" min-width="2" />
        <el-table-column prop="device_name" label="测量设备名称" min-width="2" />
        <el-table-column prop="alarm_level" label="报警等级" min-width="2" />
        <el-table-column prop="time" label="报警时间" min-width="4" />
        <el-table-column prop="content" label="报警内容" min-width="4" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "alarmQuery",
  methods:{
    currStationChange(val){
      if (val == "all") {
        this.name_show = false;
        this.time_show = false;
      }
      else if(val == "gas") {
        this.name_show = true;
        this.time_show = true;
      }
    }
  }
}
</script>

<script setup>

import {
  Search,
  Download,
} from '@element-plus/icons-vue'
import {ref} from "vue";

const query_type = ref('')
const device_name = ref('')
const value3 = ref('')
const name_show = false;
const time_show = false;
const query_type_list = [
  {
    value: 'all',
    label: '所有数据',
  },
  {
    value: 'gas',
    label: '气体浓度',
  },
  {
    value: 'temp',
    label: '温度',
  },
  {
    value: 'windPre',
    label: '风压',
  },
  {
    value: 'windSpeed',
    label: '风速',
  },
  {
    value: 'groundPre',
    label: '井下地压',
  },
  {
    value: 'disp',
    label: '位移',
  },
  {
    value: 'electric',
    label: '企业用电量',
  },
]

const device_name_list = [
  {
    value: 'O2',
    label: '氧气#1',
  },
  {
    value: 'temp',
    label: '温度',
  },
  {
    value: 'windPre',
    label: '风压',
  },
  {
    value: 'windSpeed',
    label: '风速',
  },
  {
    value: 'groundPre',
    label: '井下地压',
  },
  {
    value: 'disp',
    label: '位移',
  },
  {
    value: 'electric',
    label: '企业用电量',
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

const tableData = [
  {
    alarmID: '1',
    alarm_type: '氧气浓度',
    device_id: '1',
    device_name: '氧气#1',
    alarm_level: '低风险',
    content: '氧气浓度25.2，低于安全值',
    time: '2022-05-25 08:00:00',
  },
  {
    alarmID: '2',
    alarm_type: '人员',
    device_id: '5',
    device_name: '人员#1',
    alarm_level: '中风险',
    content:'人员未出矿但无法定位',
    time: '2022-05-25 12:00:00',
  },
  {
    alarmID: '3',
    alarm_type: '一氧化碳浓度',
    device_id: '7',
    device_name: '一氧化碳#1',
    alarm_level: '低风险',
    content: '一氧化碳浓度14.2，超出限制',
    time: '2022-05-25 17:00:00',
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

  .control{
    background-color: 	#DCDCDC;
    height: 5%;
    width: 100%;

    .el-button{
      font-size: 18px;
    }

  }

  .table{
    background: #fff;
    border-radius: 8px;
    height: 85%;
    margin-top: 2%;
  }

}
</style>