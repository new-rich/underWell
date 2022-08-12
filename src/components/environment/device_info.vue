<template>
  <div class="main">
    <div class="title">
      <span>设备信息查询</span>
    </div>

    <div class="query">
      <div class="text">
        设备搜索：
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
        <el-table-column fixed prop="dataID" label="数据ID" min-width="2">
          <!--          <template #default="scope">-->
          <!--            <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
          <!--              <template #reference>-->
          <!--                <el-tag>{{ scope.row.number }}</el-tag>-->
          <!--              </template>-->
          <!--            </el-popover>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column prop="data_type" label="数据类别" min-width="2" />
        <el-table-column prop="device_id" label="测量设备ID" min-width="2" />
        <el-table-column prop="device_name" label="测量设备名称" min-width="2" />
        <el-table-column prop="time" label="获取时间" min-width="4" />
        <el-table-column prop="content" label="数据内容" min-width="4" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "alarmQuery",
  methods:{
    currStationChange(val){
      console.log(val)
    }
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
const device_id = ref('')
const value3 = ref('')
const id_show = true;
const time_show = true;
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
    dataID: '1',
    data_type: '氧气浓度',
    device_id: '1',
    device_name: '氧气#1',
    content: '31.4',
    time: '2022-05-25 08:00:00',
  },
  {
    dataID: '2',
    data_type: '二氧化碳浓度',
    device_id: '2',
    device_name: '二氧化碳#1',
    content: '12.4',
    time: '2022-05-25 08:00:00',
  },
  {
    dataID: '3',
    data_type: '二氧化硫浓度',
    device_id: '3',
    device_name: '二氧化硫#1',
    content: '1.4',
    time: '2022-05-25 08:00:00',
  },
  {
    dataID: '4',
    data_type: '位移变化',
    device_id: '10',
    device_name: '位移测量#1',
    content: 'X方向:12.3;Y方向:8.7;H方向:31.2',
    time: '2022-05-25 08:00:00',
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