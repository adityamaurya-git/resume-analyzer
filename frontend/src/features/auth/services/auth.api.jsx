import axios from 'axios';


// ---------------------------
// Creating Instance of Axios
// ---------------------------

const instance = axios.create({
    baseURL:'http://localhost:3000/api/v1',
    withCredentials:true
})


export const registerUser = async ({username , email , password}) =>{

    try{
        const response = await instance.post('/auth/user' , {username , email , password})

        return response.data;
    }catch(err){
        console.log(err);
    }

}


export const loginUser = async ({email , password}) => {

    try{

        const response = await instance.post('/auth/user/login' , {email , password});
        return response.data;

    }catch(err){
        console.log(err);
    }

}

export const logoutUser = async () => {

    try{

        const response = await instance.post('/auth/user/logout');
        return response.data;

    }catch(err){
        console.log(err);
    }
}

export const getUser = async () => {

    try{
        const response = await instance.get('/user');
        return response.data;

    }catch(err){
        console.log(err);
    }
}