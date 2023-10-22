import axios from "axios";
import {api} from "./api.utility";

export const getSinAuth = async (endpoint: string, params?: any): Promise<any> => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let message: string = "";
    let response = null;
    try {
        if (params == undefined) {
            response = await axios.get(api() + endpoint);
        } else {
            response = await axios.get(api() + endpoint, {
                params: params
            });
        }
        if (response.status === 200) {
            let {data} = response;
            obj = data;
        } else {
            msg = {
                type: "error",
                message: `Error, no se ha podido completar su consulta.`,
            };
        }
    } catch (error: any) {
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg, obj};
};
