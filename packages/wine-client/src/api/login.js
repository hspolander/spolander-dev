import axios from "axios"

const path = '/api'

const LoginApi = {
    login(credentials) {
        const { username, password } = credentials
        return axios.post(`${path}/login`, { username, password })
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
