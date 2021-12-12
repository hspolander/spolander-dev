import axios from "axios"

const path = '/api'

const GetWine = {
    all(item) {
        const { table, value, property, orderedProp } = item
        return axios.get(`${path}/getReviews`, { params: { table, value, property, orderedProp } })
        .then((data) => data?.data?.data)
    },
    autocomplete(startsWith, prop) {
        return axios.get(`${path}/autocompleteAddWine`, { params: { startsWith, prop } })
        .then((data) => data?.data?.data)
    }
}

export default GetWine
