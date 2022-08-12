import {createRouter,createWebHistory} from 'vue-router'


const index = () => import("../components/index")
const helloWorld = () => import("../components/HelloWorld")
const menu = () => import("../components/Menu")
const O2 = () => import("../components/environment/O2")
const CO = () => import("../components/environment/CO")
const CO2 = () => import("../components/environment/CO2")
const NO2 = () => import("../components/environment/NO2")
const smoke = () => import("../components/environment/smoke")
const HS = () => import("../components/environment/HS")
const SO2 = () => import("../components/environment/SO2")
const temperature = () => import("../components/environment/temperature")
const windPre = () => import("../components/environment/windPre")
const windSpeed = () => import("../components/environment/windSpeed")
const fanUpDown = () => import("../components/environment/fanUpDown")
const pumpUpDown = () => import("../components/environment/pumpUpDown")
const groundPre = () => import("../components/environment/groundPre")
const disp = () => import("../components/environment/disp")
const electric = () => import("../components/environment/electric")
const histData = () => import("../components/environment/histData")
const judge = () => import("../components/environment/judge")
const alarmQuery = () => import("../components/environment/alarmQuery")
const locHist = () => import("../components/environment/locHist")
const analysis = () => import("../components/environment/analysis")

const routerHistory = createWebHistory()

const router = createRouter({
    history: routerHistory,
    routes:[
        {
            path: "/",
            name: "index",
            component: index
        },
        {
            path: "/hello",
            name: "helloWorld",
            component: helloWorld
        },
        {
            path: "/controlMenu",
            name: "Menu",
            component: menu,
            children:[
                {
                    path:'/controlMenu/O2',
                    name:'O2',
                    component: O2
                },
                {
                    path:'/controlMenu/CO',
                    name:'CO',
                    component: CO
                },
                {
                    path:'/controlMenu/CO2',
                    name:'CO2',
                    component: CO2
                },
                {
                    path:'/controlMenu/NO2',
                    name:'NO2',
                    component: NO2
                },
                {
                    path:'/controlMenu/smoke',
                    name:'smoke',
                    component: smoke
                },
                {
                    path:'/controlMenu/HS',
                    name:'HS',
                    component: HS
                },
                {
                    path:'/controlMenu/SO2',
                    name:'SO2',
                    component: SO2
                },
                {
                    path:'/controlMenu/temperature',
                    name:'temperature',
                    component: temperature
                },
                {
                    path:'/controlMenu/windPre',
                    name:'windPre',
                    component: windPre
                },
                {
                    path:'/controlMenu/windSpeed',
                    name:'windSpeed',
                    component: windSpeed
                },
                {
                    path:'/controlMenu/fanUpDown',
                    name:'fanUpDown',
                    component: fanUpDown
                },
                {
                    path:'/controlMenu/pumpUpDown',
                    name:'pumpUpDown',
                    component: pumpUpDown
                },
                {
                    path:'/controlMenu/groundPre',
                    name:'groundPre',
                    component: groundPre
                },
                {
                    path:'/controlMenu/disp',
                    name:'disp',
                    component: disp
                },
                {
                    path:'/controlMenu/electric',
                    name:'electric',
                    component: electric
                },
                {
                    path:'/controlMenu/histdata',
                    name:'histData',
                    component: histData
                },
                {
                    path:'/controlMenu/judge',
                    name:'judge',
                    component: judge
                },
                {
                    path:'/controlMenu/alarmQuery',
                    name:'alarmQuery',
                    component: alarmQuery
                },
                {
                    path:'/controlMenu/locHist',
                    name:'locHist',
                    component: locHist
                },
                {
                    path:'/controlMenu/analysis',
                    name:'analysis',
                    component: analysis
                }
            ]
        }
        ]
    }
)


export default router