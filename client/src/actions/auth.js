import { AUTH } from "../constants/actionTypes";
import * as api from '../api'

export const signin = (formData,navigate) => async(dispatch)=>{
    try {
        console.log("Frontend: Signin action initiated.");
        console.log("Frontend: Attempting to sign in with data:", formData);
        const {data} = await api.signIn(formData)
        dispatch({type:AUTH,data})
        console.log("Frontend: Signin successful, received data:", data);
        navigate('/')
    } catch (error) {
        // This is the error we expect to see if the request fails
        console.log("Frontend: Signin request failed.", error.response.status, error.message);
    }
}

export const signup = (formData,navigate) => async(dispatch)=>{
    try {
        //sign up the user
        const {data} = await api.signUp(formData)
        dispatch({type:AUTH,data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}