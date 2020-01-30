import React from 'react';
import fetchJsonp from 'fetch-jsonp';
import _ from 'lodash';
import { Table } from 'antd';
import AllData from './allData.jsx';
import ChinaDataComp from './chinaData.jsx';
import MapDataComp from './mapData.jsx';

class Page1 extends React.Component {
  state = {
    mainData: {},
    countryData: {},
    title: '',
    chinaData: [],
    lineData: [],
  };
  componentWillMount() {
    this.updateData();
    setInterval(() => {
      this.updateData();
    }, 1000 * 60);
    window.mydata = data => {
      this.setData(data);
    };
    window.myLineData = data => {
      this.setLineData(data);
    };
  }
  setLineData = data => {
    let tmps = JSON.parse(data.data);
    tmps = tmps.sort((a, b) => a.date.localeCompare(b.date));
    for (let i = 0; i < tmps.length; i++) {
      let it = tmps[i];
      it.sumConfirm = i === 0 ? 0 : +tmps[i].confirm - tmps[i - 1].confirm;
      it.sumDead = i === 0 ? 0 : +tmps[i].dead - tmps[i - 1].dead;
      it.sumHeal = i === 0 ? 0 : +tmps[i].heal - tmps[i - 1].heal;
      it.sumSuspect = i === 0 ? 0 : +tmps[i].suspect - tmps[i - 1].suspect;
    }
    this.setState({ lineData: tmps });
    this.refs.map.updateLineData(tmps);
  };
  updateData() {
    let url =
      'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_area_counts&callback=mydata&_=' +
      +new Date();
    fetchJsonp(url)
      .then(res => {})
      .catch(e => {});
    let url2 =
      'https://view.inews.qq.com/g2/getOnsInfo?name=wuwei_ww_cn_day_counts&callback=myLineData&_=' +
      +new Date();
    fetchJsonp(url2)
      .then(res => {})
      .catch(e => {});
  }
  setData = mydata => {
    let tmps = JSON.parse(mydata.data);
    let country = {};
    let moment = require('moment');
    let title = '最后更新时间：' + moment().format('YYYY-MM-DD HH:mm:ss');
    let chinaData = {};
    tmps.forEach(it => {
      let name = it.country;
      let item = {};
      if (country[name]) {
        item = country[name];
      } else {
        item = {
          name: name,
          dead: 0,
          heal: 0,
          suspect: 0,
          confirm: 0,
        };
        country[name] = item;
      }
      item.dead += it.dead;
      item.heal += it.heal;
      item.suspect += it.suspect;
      item.confirm += it.confirm;
      if (name == '中国') {
        let city = it.area;
        let cdata = {};
        if (chinaData[city]) {
          cdata = chinaData[city];
        } else {
          cdata = {
            name: name,
            dead: 0,
            heal: 0,
            suspect: 0,
            confirm: 0,
            child: [],
            showChild: false,
          };
          chinaData[city] = cdata;
        }
        cdata.child.push(it);
        cdata.name = name;
        cdata.area = city;
        cdata.dead += it.dead;
        cdata.heal += it.heal;
        cdata.suspect += it.suspect;
        cdata.confirm += it.confirm;
      }
    });
    console.log(chinaData);
    this.setState({
      mainData: tmps,
      countryData: country,
      title,
    });
    tmps = [];
    for (let k in chinaData) {
      let it = chinaData[k];
      it.child = it.child.sort((a, b) => b.confirm - a.confirm);
      tmps.push(it);
    }
    tmps = tmps.sort((a, b) => b.confirm - a.confirm);
    this.setState({ chindData: tmps });
    this.refs.map.updateChinaData(tmps);
  };
  updateState = it => {
    it.showChild = !it.showChild;
    let { chindData } = this.state;
    this.setState({ chindData });
  };
  render() {
    let { mainData, title, countryData, chindData, lineData } = this.state;
    return (
      <div>
        <div className="main-title">{title}</div>
        <div className="main-left">
          <AllData countryData={countryData} />
          <ChinaDataComp chindData={chindData} updateState={this.updateState} />
        </div>
        <div className="main-right">
          <MapDataComp ref="map" lineData={lineData} />
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default Page1;
