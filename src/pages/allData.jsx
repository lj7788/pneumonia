import React from 'react'
import {showText} from '../utils/tools.js'

class AllData extends React.Component{    
    render(){
        let {countryData} =this.props
        let countrys=[]
        let cdatas=[]        
        for(let k in countryData){            
            let it=countryData[k]
            cdatas.push(it)
           
        }
        cdatas=cdatas.sort((a,b)=>b.confirm-a.confirm)
        cdatas.forEach(it=>{
            countrys.push(<tr  className="bold" key={it.name}>
                <td>{it.name}</td>
                <td>{showText(it.confirm)}</td>
                <td>{showText(it.dead)}</td>
                <td>{showText(it.heal)}</td>             
            </tr>)
        })
        let cols=[
                  {title: '国家',dataIndex: 'name',key: 'name'},
                  {title: '确诊',dataIndex: 'confirm',key: 'confirm'},
                  {title: '死亡',dataIndex: 'dead',key: 'dead'},
                  {title: '治愈',dataIndex: 'heal',key: 'heal'}
                ]

        return <table className="mydata" width="400px">
                <thead>
                <tr>
                    <th>国家</th>
                    <th>确诊</th>
                    <th>死亡</th>
                    <th>治愈</th>
                </tr>
                </thead>
                <tbody>
                {countrys}
                </tbody>
            </table>   
    }
}

export default AllData;