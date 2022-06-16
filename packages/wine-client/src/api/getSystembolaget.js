import axios from "axios"

const path = '/api'

const unpackNewSysWine = (wine) => {
 const {
    // productId,
    productNumber,
    productNameBold,
    productNameThin,
    // category,
    // productNumberShort,
    // producerName,
    // supplierName,
    // isKosher,
    // bottleText,
    // restrictedParcelQuantity,
    // isOrganic,
    // isSustainableChoice,
    // isClimateSmartPackaging,
    // isEthical,
    // isWebLaunch,
    // productLaunchDate,
    // isCompletelyOutOfStock,
    // isTemporaryOutOfStock,
    // alcoholPercentage,
    // volumeText,
    // volume,
    // price,
    // originLevel1,
    // originLevel2,
    // categoryLevel1,
    // categoryLevel2,
    // categoryLevel3,
    // categoryLevel4,
    // customCategoryTitle,
    // assortmentText,
    // taste,
    // tasteClockBitter,
    // tasteClockFruitacid,
    // tasteClockBody,
    // tasteClockRoughness,
    // tasteClockSweetness,
    // tasteClockSmokiness,
    // tasteClockCasque,
    // assortment,
    // recycleFee,
    // isManufacturingCountry,
    // isRegionalRestricted,
    // packagingLevel1,
    // isNews,
    // isDiscontinued,
    // isSupplierTemporaryNotAvailable,
    // sugarContent,
    // sugarContentGramPer100ml,
    // wineSeal,
    // vintage,
    // color,
    // wineImage,
    // usage
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
        const { name, type, subType, country, price, year, description, volume, productCode } = values
        return axios.get(`${path}/getSysWines`, { params: { name, type, subType, country, price, year, description, volume, productCode } })
        .then((data) => data?.data?.data)
    },
    getNewSysWines(values) {
        const { name, type, subType, country, price, vintage, description, volume, productId } = values
        return axios.get(`${path}/getNewSysWines`, { params: { name, type, subType, country, price, vintage, description, volume, productId } })
        .then((data) => data?.data?.data.map((wine) => unpackNewSysWine(wine)))
    },
    getSystembolagetImageBlobById(blobId) {
        return fetch(`${path}/getSystembolagetImageBlobById?blobId=${blobId}`)
        .then(response => response.blob())
        .then((myBlob) => URL.createObjectURL(myBlob))
    },
    getAdditionalWineData(url) {
        const urlEncoded = encodeURIComponent(`https://www.systembolaget.se${url}`);
        return axios.get(`${path}/getAdditionalWineData`, { params: { url: urlEncoded } })
        .then((data) => data?.data?.data)
    }
}

export default GetSystembolaget
