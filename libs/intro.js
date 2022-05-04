import axios from "axios";

export default async function getIntro() {
    const intro = await axios(process.env.API_BASE_URL + '/api/intros/1?populate=*')
    return JSON.stringify(intro.data)
}