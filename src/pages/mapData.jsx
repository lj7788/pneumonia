import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/geo';
import 'echarts/map/js/china.js';

class MapData extends React.Component {
  state = {
    lineData: [],
    myChart: null,
    mapChart: null,
  };
  constructor(props) {
    super(props);
    let { lineData } = this.props;
    this.setState({ lineData });
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },

      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    this.setState({ myChart });

    this.initMainMap();
  }
  initMainMap = () => {
    var myChart2 = echarts.init(document.getElementById('mainMap'));
    // 绘制图表
    myChart2.setOption({
      series: [
        {
          name: 'iphoneX',
          type: 'map',
          mapType: 'china',
          roam: false,
          itemStyle: {
            normal: { label: { show: true } },
            emphasis: { label: { show: true } },
          },
          data: [],
        },
      ],
    });
    this.setState({
      mapChart: myChart2,
    });
  };
  updateChinaData = data => {
    let { mapChart } = this.state;
    if (mapChart) {
    
      mapChart.setOption({  
        // legend: {           
        //     x:'center',
        //     data:['confirm','dead']
        // }, 
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c}'
        },    
        dataRange: {         
            x: 'left',
            y: 'middle',
            text:['高','低'],           
            calculable : true
        },
        series: [
          {
            name: 'confirm',
            type: 'map',
            mapType: 'china',
            roam: false,
            label:{
                show:true,
            },
            itemStyle: {
              normal: { label: { show: true , formatter: '{b}\n{c}'} },
              emphasis: { label: { show: true , formatter: '{b}\n{c}'} },
            },
            data: data.map(it=>{
                return {
                    name:it.area,
                    value:it.confirm
                }
            })
          }
        ],
      });
    }
  };
  updateLineData = data => {
    let { myChart } = this.state;
    if (myChart) {
      myChart.setOption({
        yAxis: {
          type: 'value',
        },
        legend: {
          data: ['疑似', '确诊', '死亡', '治愈'],
        },
        xAxis: {
          data: data.map(it => it.date),
        },
        series: [
          {
            name: '确诊',
            type: 'line',
            data: data.map(it => it.confirm),
          },
          {
            name: '死亡',
            type: 'line',
            data: data.map(it => it.dead),
          },
          {
            name: '治愈',
            type: 'line',
            data: data.map(it => it.heal),
          },
          {
            name: '疑似',
            type: 'line',
            data: data.map(it => it.suspect),
          },
        ],
      });
    }
  };

  render() {
    return (
      <div>
        <div id="main" style={{ width: '100%', height: 300 }}></div>
        <div id="mainMap" style={{ width: '100%', height: 600 }}></div>
      </div>
    );
  }
}
export default MapData;
