import axios from 'axios';

// ---------------------------
// Creating Instance of Axios
// ---------------------------

const instance = axios.create({
    baseURL:'http://localhost:3000/api/v1',
    withCredentials:true
})


/**
 * @description Service to generate interview report based on user self description, resume, and job description.
 */

export const generateReport = async ({ resume, selfDescription, jobDescription }) => {

    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resume);

    const response = await instance.post('/report', formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    });

    return response.data

}

/**
 * @description Service to get the report by reportId
 */

export const getReportById = async (reportId) => {


    const response = await instance.get(`/report/${reportId}`);

    return response.data;

}


/**
 * @description Service to get all the reports of the user.
 */

export const getAllReport = async () => {


    const response = await instance.get(`/report`);

    return response.data;

}