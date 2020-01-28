let showText=(d)=>{
    if(d<10){
        return <span>{d}</span>
    }
    if(d<100){
        return <span style={{color:'blue'}}>{d}</span>
    }
    return <span style={{color:'red'}}>{d}</span>
}


export {
    showText
}