<template>
  <div style="height: 100%">
    <div class="control_menu" style="height:100%">
      <el-container style="height:100%">
        <el-aside style="height: 100%;overflow-y: auto">
          <el-menu
              active-text-color="#ffd04b"
              background-color="#031022"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              default-active="1"
              text-color="#fff"
              :default-openeds="['1']"
              ref="menu"
              style="height: 100%;"
              router
          >
            <el-menu-item index="/">
                <el-icon ><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-sub-menu index="1">
              <template #title>
                <el-icon ><IconMenu/></el-icon>
                <span>环境监测</span>
              </template>
              <el-sub-menu index="1-1">
                <template #title>
                  <el-icon ><IconMenu/></el-icon>
                  <span>数据监测</span>
                </template>
                <el-sub-menu index="1-1-1">
                <template #title>
                  <el-icon ><Cloudy/></el-icon>
                  <span>气体浓度</span>
                </template>
                <el-menu-item index="/controlMenu/O2">氧气浓度</el-menu-item>
                <el-menu-item index="/controlMenu/CO">一氧化碳浓度</el-menu-item>
                <el-menu-item index="/controlMenu/CO2">二氧化碳浓度</el-menu-item>
                <el-menu-item index="/controlMenu/NO2">二氧化氮浓度</el-menu-item>
                <el-menu-item index="/controlMenu/smoke">烟雾浓度</el-menu-item>
                <el-menu-item index="/controlMenu/HS">硫化氢浓度</el-menu-item>
                <el-menu-item index="/controlMenu/SO2">二氧化硫浓度</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="/controlMenu/temperature">温度</el-menu-item>
              <el-menu-item index="/controlMenu/windPre">风压</el-menu-item>
              <el-menu-item index="/controlMenu/windSpeed">风速</el-menu-item>
              <el-menu-item index="/controlMenu/fanUpDown">通风机开停</el-menu-item>
              <el-menu-item index="/controlMenu/pumpUpDown">水泵开停</el-menu-item>
              <el-menu-item index="/controlMenu/groundPre">井下地压</el-menu-item>
              <el-menu-item index="/controlMenu/disp">位移变化</el-menu-item>
              <el-menu-item index="/controlMenu/electric">企业用电量</el-menu-item>
              </el-sub-menu>
            <el-menu-item index="/controlMenu/histdata">
              <el-icon ><Document /></el-icon>
              <span>历史数据查询</span>
            </el-menu-item>
            <el-menu-item index="/controlMenu/judge">
                <el-icon ><Star /></el-icon>
                <span>智能评判</span>
            </el-menu-item>
            <el-menu-item index="/controlMenu/alarmQuery">
              <el-icon ><Warning /></el-icon>
              <span>报警信息查询</span>
            </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <el-icon ><User/></el-icon>
                <span>人员定位</span>
              </template>
              <el-menu-item index="">井下人数情况</el-menu-item>
              <el-menu-item index="/controlMenu/locHist">历史数据查询</el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/controlMenu/analysis">
                <el-icon ><DataAnalysis/></el-icon>
                <span>统计分析</span>
            </el-menu-item>

            <el-menu-item index="4">
              <el-icon ><HomeFilled /></el-icon>
              <span>设备信息</span>
            </el-menu-item>

            <el-sub-menu index="5">
              <template #title>
                <el-icon ><Setting/></el-icon>
                <span>系统管理</span>
              </template>
              <el-menu-item index="">用户信息设置</el-menu-item>
              <el-menu-item index="">设备管理</el-menu-item>
              <el-menu-item index="">短信推送设置</el-menu-item>
            </el-sub-menu>

          </el-menu>
        </el-aside>
        <el-main style="overflow-y: hidden; background-color: #f3f4f9;">
          <router-view/>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>

import {
  Menu as IconMenu,
  HomeFilled,
  Star,
  Warning,
  Document,
  Cloudy,
  User,
  DataAnalysis,
  Setting
} from '@element-plus/icons-vue'

import * as d3 from 'd3';

export default {
  components:{
    Document,
    HomeFilled,
    Star,
    Warning,
    IconMenu,
    Cloudy,
    User,
    DataAnalysis,
    Setting
  },
  name: "Menu",
  methods:{
    handleOpen(key, keyPath) {

      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
}
</script>

<style scoped>

</style>