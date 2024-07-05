import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'

import {
  BarChart,
  LineChart,
  MapChart,
  PieChart,
  RadarChart,
} from 'echarts/charts'

import {
  DataZoomComponent, //  区域缩放组件
  GeoComponent, //  地理坐标系组件
  GraphicComponent, //  图形组件,
  GridComponent, //  网格组件
  LegendComponent, //  图例组件
  TitleComponent, //  标题组件
  TooltipComponent, //  提示框组件
  VisualMapComponent, //  视觉映射组件
} from 'echarts/components'

use([
  VisualMapComponent,
  TitleComponent, //  标题组件
  CanvasRenderer, //  渲染器
  BarChart, //  柱状图
  LineChart, //  折线图
  PieChart, //  饼图
  RadarChart, //  雷达图
  GridComponent, //  网格组件
  TooltipComponent, //  提示框组件
  LegendComponent, //  图例组件
  DataZoomComponent, //  区域缩放组件
  GraphicComponent, //  图形组件,
  GeoComponent, //  地理坐标系组件,
  MapChart, //  地图组件
])
