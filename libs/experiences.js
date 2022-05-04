import axios from "axios";

export default async function getExperiences() {
    const expData = await axios(process.env.API_BASE_URL + '/api/experiences?populate=*&sort[0]=start%3Adesc')
    return JSON.stringify(expData.data)
}