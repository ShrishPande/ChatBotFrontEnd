import axios from "axios"
import { BASE_URL } from "./helper"
const API=axios.create({baseURL:BASE_URL})

export const requestAnswer =(question)=>{
    return API.post('/',question)
}
