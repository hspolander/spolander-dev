import axios from "axios"

const path = '/api'

const AddWineReview = {
    one(item) {
        const { name, country, grapes, price, type, subType, producer, nr, year, boughtFrom, score, volume, comment } = item
        return axios.post(`${path}/insertWineReview`, { name, country, grapes, price, type, subType, producer, nr, year, boughtFrom, score, volume, comment })
        .then((data) => data?.data?.data)
    },
}

export default AddWineReview
