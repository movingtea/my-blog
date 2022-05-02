import axios from "axios";

export async function getClientsData() {
    const clientsData = await axios(process.env.API_BASE_URL + '/api/clients?populate=*')
    return JSON.stringify(clientsData.data)
}