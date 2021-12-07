import axios from "axios"

const path = '/api'

const GetWines = {
    all(item) {
        const { table, value, property, orderedProp } = item
        return axios.get(`${path}/getReviews`, { params: { table, value, property, orderedProp } })
        .then((data) => data?.data?.data)
    },
}

export default GetWines
