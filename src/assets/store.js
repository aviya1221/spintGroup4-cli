import { create } from 'zustand';

const userStore=create((set,get)=>({
showDetails:false,
 setShowDetails:()=>{
    const current= get().showDetails
    set({showDetails:!current})
}
}))
export default userStore;