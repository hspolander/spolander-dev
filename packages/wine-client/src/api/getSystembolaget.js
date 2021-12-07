import axios from "axios"

const path = '/api'

const GetSystembolaget = {
    getSubTypes() {
        return axios.get(`${path}/getSubTypes`)
        .then((data) => data?.data?.data)
    },
    getCountries() {
        return axios.get(`${path}/getCountries`)
        .then((data) => data?.data?.data)
    },
    getTypes() {
        return axios.get(`${path}/getTypes`)
        .then((data) => data?.data?.data)
    },
    getSysWines(values) {
        const { name, type, subType, country, price, year, description, volume, productCode } = values
        return axios.get(`${path}/getSysWines`, { params: { name, type, subType, country, price, year, description, volume, productCode } })
        .then((data) => data?.data?.data)
    },
}

export default GetSystembolaget
