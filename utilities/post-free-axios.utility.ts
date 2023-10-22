import axios from "axios";
import {api} from "./api.utility";

export const postSinAuth = async (endpoint: string, bodyParams?: any): Promise<any> => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let response: any;
    let message: string = "";
    try {
        if (bodyParams == undefined) {
            response = await axios.post(api() + endpoint);
        } else {
            response = await axios.post(api() + endpoint, bodyParams);
        }
        if (response.status === 200 || response.status === 201) {
            let {data} = response;
            obj = data;
        }
    } catch (error: any) {
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg, obj};
};