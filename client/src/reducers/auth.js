import {AUTH,LOGOUT} from '../constants/actionTypes'

const authReducer = (state={authData:null},action)=>{
    switch (action.type) {
        case AUTH:
            // console.log(action?.data)
            //we want to save it in th loaclstorage 
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return {...state,authData:action?.data};
            // and we will use this data in the navbar 
        case LOGOUT:
            // clear the profile 
            localStorage.clear()
            return {...state,authData:null};

            
        default:
            return state
    }
}

export default authReducer