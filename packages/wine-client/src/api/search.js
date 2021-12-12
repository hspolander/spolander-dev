import axios from "axios"

const path = '/api'

const SuperSearch = {
    autocomplete(startsWith) {
        return axios.get(`${path}/autocompleteSearch`, { params: { startsWith } })
        .then((data) => data?.data?.data)
    },
}

export default SuperSearch
