function arrTree(target,pid = null){
    let arr = target.filter(item => item.pid == pid);
    let other = target.filter(item => item.pid != pid);
    if(other.length > 0){
        arr.forEach((item,index)=>{
            arrTree(other,item.pid)
        })
    }
}

function MaxDate(arr){
    let obj = {}
    arr.forEach((item,index) =>{
        if(obj[item]){
            obj[item]++
        }else{
            obj[item] = 1
        }
    })
}
let bb = [1,1,1,2,3,4,1]
console.log(MaxDate(bb));
