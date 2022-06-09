let id:number = parseInt(window.localStorage.getItem('_id_max')||'0') || 0

function createID(){
    return id++
}

export default createID