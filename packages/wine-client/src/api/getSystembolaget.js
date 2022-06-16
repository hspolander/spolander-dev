import axios from "axios"

const path = '/api'

const unpackSysWine = (wine) => {
 const {
    productNumber,
    productNameBold,
    productNameThin,
    image,
    } = wine

    const wineLinkText = productNameBold.replaceAll(' ', '-')
    const link = `https://www.systembolaget.se/produkt/vin/${wineLinkText}-${productNumber}/`
    const name = `${productNameBold}, ${productNameThin}`
    return {...wine, link, name, image }
}

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
        const { name, type, subType, country, price, vintage, description, volume, productId } = values
        return axios.get(`${path}/getSysWines`, { params: { name, type, subType, country, price, vintage, description, volume, productId } })
        .then((data) => data?.data?.data.map((wine) => unpackSysWine(wine)))
    }
}

export default GetSystembolaget
