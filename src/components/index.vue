<template>
  <div class="mapMain" @click="getMouseXY($event)">
    <div class="info">
      <div class="infoHeader">
        <p>透明矿山井下定位系统</p>
        <img class="infoHeaderImg" :src="headImg" alt="" @click="goControl">
        <div class="item1" @click="twoDClick">
          <p class="titleP">二维显示</p>
          <img :src="this.is2DShow == true ? kImg1_select : kImg1_unselect" alt="">
        </div>
        <div class="item2" @click="threeDClick">
          <p class="titleP">三维显示</p>
          <img :src="this.is3DShow == true ? kImg2_select : kImg2_unselect" alt="">
        </div>
      </div>
      </div>
    <div class="infoContent">
      <div class="infoContentL">
        <div class="chartBlock">
          <div class="blockTitle">
            监测终端在线情况
          </div>
          <div class="blockContent" id="countChart">

          </div>
        </div>
        <div class="chartBlock">
          <div class="blockTitle">
            实时监测数据
          </div>
          <div class="blockContent">
            <div class="dataRow">
              <div class="dataBlock">
                <img :src="windNor" alt="" class="dataIcon">
                <div class="textArea">
                  <div class="dataText">
                    风速监测设备
                  </div>
                  <div class="dataText">
                    2
                  </div>
                </div>
              </div>
              <div class="dataBlock">
                <img :src="windNor" alt="" class="dataIcon">
                <div class="textArea">
                  <div class="dataText">
                    风量设备101
                  </div>
                  <div class="dataText">
                    20
                  </div>
                </div>
              </div>
            </div>
            <div class="dataRow" style="margin-top: 2%">
              <div class="dataBlock">
                <img :src="CONor" alt="" class="dataIcon">
                <div class="textArea">
                  <div class="dataText">
                    CO监测设备
                  </div>
                  <div class="dataText">
                    5.5
                  </div>
                </div>
              </div>
              <div class="dataBlock">
                <img :src="O2Ab" alt="" class="dataIcon">
                <div class="textArea">
                  <div class="dataText">
                    O^2监测设备
                  </div>
                  <div class="dataText">
                    547
                  </div>
                </div>
              </div>
            </div>
            <div class="dataRow" style="margin-top: 2%">
              <div class="dataBlock">
                <img :src="NoNor" alt="" class="dataIcon">
                <div class="textArea">
                  <div class="dataText">
                    NO监测设备
                  </div>
                  <div class="dataText">
                    7.9
                  </div>
                </div>
              </div>
              <div class="dataBlock">
                <img :src="personNor" alt="" class="dataIcon">
                <div class="textArea">
                  <div class="dataText">
                    人员监测设备
                  </div>
                  <div class="dataText">
                    正常
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chartBlock">
          <div class="blockTitle">
            报警次数
          </div>
          <div class="blockContent" id="barChart">
          </div>
        </div>
      </div>
      <div class="infoContentM">
        <div class="towD" v-show="is2DShow">
          <img :src="towDImg" alt="" style="width: 1100px;height: 900px;margin-left: -50px">
        </div>

        <div class="threeD" v-show="is3DShow">
          <img :src="threeDImg" alt="" style="width: 1200px;height: 950px;margin-left: -40px">
        </div>
      </div>
      <div class="infoContentR">
        <div class="Citem1">
          <img class="bgImg_big" :src="bgImg" alt="">
          <div class="Citem1Content">
            <div class="carBlock">
              <p>施工人员数：31人</p>
              <div class="carContent">
                <span>张三</span>
                <span>李四</span>
                <span>王五</span>
              </div>
            </div>
            <el-divider class="dash_divider"></el-divider>
            <div class="carBlock" style="margin-top: -20px">
              <p>安全员人数：3人</p>
              <div class="carContent">
                <span>赵六</span>
                <span>陈七</span>
              </div>
            </div>
            <el-divider class="dash_divider"></el-divider>
            <div class="carBlock" style="margin-top: -20px">
              <p>领班人数：1人</p>
              <div class="carContent">
                <span>刘八</span>
              </div>
            </div>
          </div>
        </div>
        <div class="Citem2">
          <img class="bgImg_small" :src="bgImg2" alt="">
          <div class="Citem2Content">
            <p>风量监测设备：4台</p>
            <p>人员定位基站：5台</p>
          </div>
        </div>
      </div>
    </div>
      <img v-for='(item) in iconList' :key="item.id" :src="item.type"  alt=""  class="picGen" :style="{ left: item.left + 'px', top: item.top + 'px' }">
  </div>
</template>


<script>

export default{
  data() {
    return{
      headImg:require('@/assets/head_middle.png'),
      kImg1_select:require('@/assets/head_left_sel.png'),
      kImg2_select:require('@/assets/head_right_sel.png'),
      kImg1_unselect:require('@/assets/head_left_unsel.png'),
      kImg2_unselect:require('@/assets/head_right_unsel.png'),
      bgImg: require('@/assets/bg2.png'),
      bgImg2: require('@/assets/bg.png'),
      towDImg:require('@/assets/towDmain.png'),
      threeDImg:require('@/assets/threeDmain.png'),
      iconList:[],
      is2DShow:true,
      is3DShow:false,
      windNor:require('@/assets/icon/windNor.svg'),
      CONor:require('@/assets/icon/CONor.svg'),
      O2Ab:require('@/assets/icon/O2Ab.svg'),
      NoNor:require('@/assets/icon/NONor.svg'),
      personNor:require('@/assets/icon/personNor.svg'),
    }
  },
  methods:{
    handleOpen(key, keyPath) {
      if(key === '3'){
        this.$refs.menu.close('1');
        this.$refs.menu.close('4');
        this.$refs.menu.open('2');
      }
      else if(key === '4'){
        this.$refs.menu.close('2');
        this.$refs.menu.close('1');
        this.$refs.menu.open('3')
      }
      else if(key === '1'){
        this.$refs.menu.open('2');
        this.$refs.menu.close('3');
        this.$refs.menu.close('4')
      }
      else if(key === '2'){
        this.$refs.menu.open('1');
        this.$refs.menu.close('3');
        this.$refs.menu.close('4')
      }
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    twoDClick(){
      let that = this;
      that.is2DShow = true;
      that.is3DShow = false;
    },
    threeDClick(){
      let that = this;
      that.is2DShow = false;
      that.is3DShow = true;
    },
    goControl(){
      console.log(1)
      this.$router.push('/controlMenu/O2')
    },
    getMouseXY(e){
      console.log(e.x);
      console.log(e.y);
    }
  },

  mounted() {

    this.initbar()
  },
  watch: {

  }
}

</script>

<script setup>

import * as echarts from 'echarts'
import {onMounted} from "vue";
import img1 from '../assets/icon/circleColor.svg'
import img2 from '../assets/icon/circleHui.svg'

onMounted(
    () => {
      initbar();
      initcount();
    }
)

function initbar() {
  var barchart = echarts.init(document.getElementById('barChart'));
  var barOption = {
    title: {
      text: ''
    },
    color: ['#00BFFF'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle:{
        color:'#ccc',
        fontSize:16
      }},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name:'报警数',
        data: [196, 147, 155, 75, 196, 89, 142, 89],
        type: 'bar',
      }
    ],
  };
  barchart.setOption(barOption);
}

function initcount(){
  var countchart = echarts.init(document.getElementById('countChart'));
  var img = {
    a: "../../assets/icon/circleColor.svg",  //要写静态路径，否则会拿不到图片
    b: "../../assets/icon/circleHui.svg"
  };

  var countOption = {
    title: {
      text: "",
      subtext: "",
      textStyle: {
        color: "#fff",
        fontSize: 16
      },
      left: "5%",
      top: "5%"
    },
    grid: {
      left: "2%",
      top: "5%",
      bottom: "15%",
      right: "10%",
      containLabel: true
    },
    tooltip: {
      trigger: "item"
    },
    xAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        type: "category",
        inverse: false,
        data: [
          "一氧化碳  " + (0.56 * 100).toFixed(2) + "%",
          "一氧化氢  " + (0.39 * 100).toFixed(2) + "%",
          "氧气  " + (0.96 * 100).toFixed(2) + "%",
          "风速  " + (0.60 * 100).toFixed(2) + "%",
          "风量  " + (0.96 * 100).toFixed(2) + "%"
        ],
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: "dotted",
            color: "#fff"
          }
        },
        axisLabel: {
          margin: 20,
          textStyle: {
            color: "#fff",
            fontSize: 14
          }
        }
      }
    ],
    series: [
      {
        tooltip: {
          show: false
        },
        z: 2,
        type: "pictorialBar",
        symbolSize: ["10", "14"],
        symbolRepeat: "fixed",
        data: [
          {
            value: 10,
            symbol: "image://" + img2  //图片前要加’image://‘，否则也不会显示图片
          },
          {
            value: 1,
            symbol: "image://" + img2
          },
          {
            value: 1,
            symbol: "image://" + img2
          },
          {
            value: 1,
            symbol: "image://" + img2
          },
          {
            value: 1,
            symbol: "image://" + img2
          }
        ]
      },
      {
        z: 3,
        type: "pictorialBar",
        symbolSize: ["10", "14"], //上下图大小
        animation: true,
        symbolRepeat: "fixed",
        symbolClip: true,
        symbolPosition: "start",
        symbolOffset: [0, 0],
        data: [
          {
            value: 150,
            symbol: "image://" + img1
          },
          {
            value: 189,
            symbol: "image://" + img1
          },
          {
            value: 50,
            symbol: "image://" + img1
          },
          {
            value: 72,
            symbol: "image://" + img1
          },
          {
            value: 150,
            symbol: "image://" + img1
          }
        ],
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 14
            },
            position: "right",
            offset: [6, 0]
          }
        }
      },
      {
        type: "bar"
      }
    ]
  };
  countchart.setOption(countOption);
}

</script>

<style lang='scss'>

.picGen{
  position: absolute;
  height: 50px;
  width: 70px;
}


.bgImg_big {
  position: absolute;
  width: 100% !important;
  height: 500px;
  left: 0;
  z-index: -1;
  opacity: 0.5;
}

.bgImg_small {
  position: absolute;
  width: 100% !important;
  height: 300px;
  left: 0;
  z-index: -1;
}

.mapMain {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: linear-gradient(rgba(3, 16, 41, 1) 100%, rgba(255, 255, 255, 0.001) 99%);

  .infoHeader {
    position: relative;
    background-image: linear-gradient(rgba(3, 16, 41, 1) 80%, rgba(255, 255, 255, 0.001) 99%);
    height: 100px;

    p {
      color: #01CEFB;
      font-size: 28px;
      margin-top: 21px;
    }

    .infoHeaderImg {
      position: absolute;
      top: 24px;
      height: 55%;
      right: 50%;
      transform: translateX(50%);
    }
    .infoHeaderImg:hover{
      cursor: pointer;
    }

    .item1,
    .item2 {
      position: absolute;
      top: 29px;
      height: 55%;
      right: 65%;
      transform: translateX(50%);
      width: 8.5%;
      cursor: pointer;

      img {
        height: 100%;
        width: 100%;
      }

      p {
        position: absolute;
        margin: 0;
        font-size: 18px;
        width: 100%;
        color: #009CFF;
        right: 50%;
        line-height: 55px;
        transform: translateX(50%);
      }
    }

    .item2 {
      top: 29px;
      right: 35%;

      p {
        color: #009CFF;
      }
    }
  }

  .infoContent {

    .infoContentL{
      position: fixed;
      width:23%;
      height: 100%;
      //background-image: linear-gradient(to right, #031029 30%, rgba(3, 16, 43, 0.7) 90%, rgba(24, 53, 83, 0.01) 100%);
      top: 0;

      .chartBlock{
        width: 100%;
        height: 30%;
        margin-top: 5%;
        //border: 2px dashed 	#4682B4;
        //outline: 2px solid 	#191970;
        //outline-offset: 8px;
        border: 4px solid 	#191970;
        border-radius: 20px;
        filter: alpha(opacity=90);

        background: rgba(	173,216,230,0.2);

        .blockTitle{
          height: 15%;
          width: 100%;
          font-size: 28px;
          font-weight: 550;
          text-align: left;
          margin-left: 2%;
          color: white;
        }

        .blockContent{
          height: 280px;
          width: 450px;
          display: inline;
          .dataRow{
            width: 100%;
            height: 25%;
            display: flex;
            .dataBlock{
              width: 40%;
              height: 100%;
              border: 2px solid 	#4682B4;
              margin-left: 5%;
              display: flex;
              .dataIcon{
                height: 100%;
                width: 30%;
                float: left;
                margin-left: 5%;
              }
              .textArea{
                width: 70%;
                height: 60%;
                margin-top: 5%;
                margin-left: 5%;
                .dataText{
                  font-size: 18px;
                  font-weight: 300;
                  color: white;
                  float: left;
                  margin-top: 5%;
                }
              }

            }
          }
        }
      }
    }

    .infoContentR {
      position: fixed;
      width: 20%;
      height: 100%;
     // background-image: linear-gradient(to right, #031029 30%, rgba(3, 16, 43, 0.7) 90%, rgba(24, 53, 83, 0.01) 100%);
      top: 0;
      margin-top: 80px;

      .Citem1 {
        .Citem1Content {
          display: inline-block;
          float: left;
          width: 100%;
          height: 100%;

          .title{
            color: #496174;
            float: left;
            font-size: 28px;
            font-weight: bold;
            width: 100%;
          }

          .dash_divider{
            border-top: 1px dashed #e8eaec;
            width: 80%;
            margin-bottom: 0 !important;
            margin-top: 0 !important;
          }
        }
      }

      .Citem1
      {
        width: 402px;
        margin-left: 21px;
        margin-right: 21px;
        height: 500px;
        text-align: left;

        .carBlock{
          height: 23%;
          width:100%;
          p {
            color: #fff;
            font-size: 20px;
            height: 20px;
          }


          .carContent{
            float:left;

            span{
              width: 100%;
              color: #fff;
              font-size: 16px;
              line-height: 18px;
              display:block;
            }
          }

        }


        .border {
          box-sizing: border-box;
          width: 402px;
          height: 1px;
          background: #444F5D;
          border-left: #009CFF solid 30px;
          margin-bottom: 30px;
        }

        img {
          float: right;
          width: 40px;
        }
      }
      .Citem2{
        width: 402px;
        margin-left: 21px;
        margin-right: 21px;
        height: 270px;
        text-align: left;

        .title{
          color: #496174;
          float: left;
          font-size: 28px;
          font-weight: bold;
          width: 100%;
        }

        p {
          color: #fff;
          margin-bottom: 15px;
          margin-top: 20px;
          padding-top: 30px;
          font-size: 16px;
        }

        .border {
          box-sizing: border-box;
          width: 402px;
          height: 1px;
          background: #444F5D;
          border-left: #009CFF solid 30px;
          margin-bottom: 30px;
        }

        img {
          float: right;
          width: 40px;
        }
      }
    }

    .infoContentR {

      right: 0;

      .itemSwitch {
        float: right;
        font-size: 16px;

        p {
          cursor: pointer;
        }

        p:first-child {
          color: #009CFF;
        }

        img {
          margin: 0 5px;
          width: 14px;
          float: none;
        }
      }
    }


    .infoContentM{
      position: fixed;
      width: 60%;
      margin-left: 23%;
      height: 100%;
      top: 0;
      margin-top: 100px;

      .towD{
        height: 100%;
        width: 100%;
        .row{
          width: 100%;
          height: 220px;
          display: flex;
          .place{
            height: 200px;
            width: 280px;
            .carIcon{
              height: 50px;
              width: 80px;
              z-index: 3;
            }
            .placeImg{
              height: 200px;
              width: 250px;
              z-index: 2;
            }
            .placeIcon{
              height: 175px;
              width: 240px;
              z-index: 1;
              opacity: 0.25;
              margin-top: 18px;
              //margin-left: -10px;
            }
          }
          .road{
            margin-top: 50px;
            height: 80px;
            width: 220px;
            background-color: white;
          }
          .roadVer{
            height: 100px;
            width: 80px;
          }
        }
      }

      .threeD{
        height: 100%;
        width: 100%;
      }
    }
  }

}
</style>