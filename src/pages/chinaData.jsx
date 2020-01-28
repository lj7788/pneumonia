import React from 'react'
import { Icon } from 'antd';
class ChinaData extends React.Component{
    up=(it)=>{
        let updateState=this.props.updateState
        if(updateState){
            updateState(it)
        }
    }
    makeTable=(data)=>{        
        let tmps=[]
        if(data){
            data.forEach(it=>{
                let btn=<Icon type="right" />
                if(it.showChild){
                    btn=<Icon type="down" />
                }
                let showText=(d)=>{
                    if(d<10){
                        return <span>{d}</span>
                    }
                    if(d<100){
                        return <span style={{color:'blue'}}>{d}</span>
                    }
                    return <span style={{color:'red'}}>{d}</span>
                }
                tmps.push(<tr key={it.name+it.area}>                
            <td className="bold fs14" onClick={()=>this.up(it)} style={{cursor:'pointer'}}>{it.area}{btn}</td>
                    <td>{showText(it.confirm)}</td>
                    <td>{showText(it.dead)}</td>
                    <td>{showText(it.heal)}</td> 
                </tr>)
                if(it.showChild){
                    it.child.forEach(itt=>{
                        tmps.push(<tr key={itt.name+itt.area+itt.city}>
                            <td align="right">{itt.city}</td>
                            <td>{showText(itt.confirm)}</td>
                            <td>{showText(it.dead)}</td>
                            <td>{showText(it.heal)}</td> 
                        </tr>)
                    })
                }
            })
        }
        return tmps;
    }
    render(){
        let {chindData}=this.props
        let tbData=this.makeTable(chindData)
        return  <table className="mydata china-data" width="400px" >
        <thead>
            <tr>
                <th>地区</th>
                <th>确诊</th>
                <th>死亡</th>
                <th>治愈</th>
            </tr>
        </thead>
        <tbody>
        {tbData}
        </tbody>
    </table>  
    }
}

export default ChinaData