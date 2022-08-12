<template>
  <div class="main">
    <div class="title">
      <span>人员定位历史数据</span>
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
        <el-select v-model="device_name" class="m-2" placeholder="铲车#1" size="large" v-show="name_show">
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
      <el-button plain color="#626aef" style="width: 8%;height: 80%;margin-left: 5%;margin-top: 5px;float: left" @click="gant_click($event)">切换甘特图</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border size="large" v-show="table_show">
        <el-table-column fixed prop="dataID" label="数据ID" min-width="2">
          <!--          <template #default="scope">-->
          <!--            <el-popover effect="light" trigger="hover" placement="top" width="auto">-->
          <!--              <template #reference>-->
          <!--                <el-tag>{{ scope.row.number }}</el-tag>-->
          <!--              </template>-->
          <!--            </el-popover>-->
          <!--          </template>-->
        </el-table-column>
        <el-table-column prop="person_id" label="人员ID" min-width="2" />
        <el-table-column prop="person_name" label="人员姓名" min-width="2" />
        <el-table-column prop="device_id" label="设备ID" min-width="2" />
        <el-table-column prop="device_name" label="设备名称" min-width="2" />
        <el-table-column prop="startTime" label="操作开始时间" min-width="4" />
        <el-table-column prop="endTime" label="操作结束时间" min-width="4" />
        <el-table-column prop="type" label="操作类型" min-width="4" />
      </el-table>
      <img class="gant_exp" :src="gantImg" alt="" v-show="img_show">
    </div>
  </div>
</template>

<script>
export default {
  name: "locHist",
  data(){
    return{
      gantImg:require('@/assets/gant.png'),
      table_show:true,
      img_show:false,
    }
  },
  methods:{
    currStationChange(val){
      if (val == "all") {
        this.name_show = false;
        this.time_show = false;
      }
      else if(val == "device") {
        this.name_show = true;
        this.time_show = true;
      }
    },
    gant_click(e){
      if(e.target.innerHTML == "切换甘特图"){
        console.log(1)
        this.table_show = false;
        this.img_show = true;
        e.target.innerHTML = "切换表格"
      }
      else{
        this.table_show = true;
        this.img_show = false;
        e.target.innerHTML = "切换甘特图"
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
    value: 'device',
    label: '按设备查询',
  },
  {
    value: 'person',
    label: '按人员查询',
  },
]

const device_name_list = [
  {
    value: '1',
    label: '铲车#1',
  },
  {
    value: '2',
    label: '铲车#2',
  },
  {
    value: '3',
    label: '铲车#3',
  },
  {
    value: '4',
    label: '前装机#1',
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
    person_id: '1',
    person_name: '何仕标',
    device_id: '1',
    device_name: '铲车#1',
    startTime: '2022-05-25 14:00:00',
    endTime: '2022-05-25 16:00:00',
    type: '工作',
  },
  {
    dataID: '2',
    person_id: '4',
    person_name: '洪玲',
    device_id: '2',
    device_name: '铲车#2',
    startTime: '2022-05-25 11:00:00',
    endTime: '2022-05-25 12:00:00',
    type: '备用',
  },
  {
    dataID: '3',
    person_id: '5',
    person_name: '潘少龙',
    device_id: '3',
    device_name: '铲车#3',
    startTime: '2022-05-25 08:00:00',
    endTime: '2022-05-25 11:00:00',
    type: '工作',
  },
  {
    dataID: '4',
    person_id: '6',
    person_name: '朱春元',
    device_id: '4',
    device_name: '前装机#1',
    startTime: '2022-05-25 15:00:00',
    endTime: '2022-05-25 16:00:00',
    type: '工作',
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

  .gant_exp{
    height: 85%;
    margin-top: 1%;
    width: 95%;
  }

}
</style>