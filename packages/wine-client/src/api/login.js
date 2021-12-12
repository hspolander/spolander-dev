import axios from "axios"

const path = '/api'

const LoginApi = {
    login(credentials) {
        return axios.post(`${path}/login`, { credentials })
        .then((data) => data?.data)
    },
    authRequest(){
        return axios.get(`${path}/keepalive`)
        .then((data) => data?.data)
    },
    logout(){
        return axios.get(`${path}/killSession`)
        .then((data) => data?.data)
    },
}

export default LoginApi
