import { create } from 'zustand';

const userStore=create((set,get)=>({
showDetails:false,
 setShowDetails:()=>{
    const current= get().showDetails
    set({showDetails:!current})
},
selctedRowId:-1,
setSelctedRowId:(id)=>{
    set({selctedRowId:id})
}
}))
export default userStore;