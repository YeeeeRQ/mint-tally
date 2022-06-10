let id:number = parseInt(window.localStorage.getItem('_id_max')||'0') || 0

function createID(){
    id++;
    window.localStorage.setItem('_id_max',id.toString());
    return id;
}

export default createID