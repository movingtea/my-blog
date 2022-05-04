import axios from "axios";

export async function getCertificates() {
    const certificates = await axios(process.env.API_BASE_URL + '/api/certificates?populate=*')
    return JSON.stringify(certificates.data)
}