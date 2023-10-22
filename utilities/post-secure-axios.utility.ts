import axios from "axios";
import {api} from "./api.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";
import {addCookie, getObjCookie} from "./auth-cookies.utility";

export const post = async (req: any, res: any, endpoint: string, bodyParams?: any): Promise<any> => {
    let msg: any = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let data: any = null;
    const userLogged: string = getObjCookie('userLogged', res, req) as string;
    let userDetails = JSON.parse(userLogged);
    let message: string = "";
    try {
        if (bodyParams == undefined) {
            data = await axios.post(api() + endpoint,null,{
                headers:{
                    "Authorization" : `Bearer ${userDetails.token}`,
                    "Accept" : "application/json"
                }
            });
        } else {
            data = await axios.post(api() + endpoint, bodyParams, {
                headers:{
                    "Authorization" : `Bearer ${userDetails.token}`,
                    "Accept" : "application/json"
                }
            });
        }
        if (data.status === 200 || data.status === 201) {
            if (data.data.hasOwnProperty("successStatus")) {
                if (data.data.successStatus === true) {
                    msg = {
                        statusCode: data.status,
                        type: "success",
                        message: `Acción realizada correctamente.`,
                    };
                } else {
                    msg = {
                        statusCode: data.status,
                        type: "error",
                        message: data.data.message,
                    };
                }
            } else {
                obj = data.data;
            }

        }
    } catch (error: any) {
        if (error.message.indexOf("Unauthorized")) {
            if (userDetails !== undefined && userDetails !== null) {
                const refresh: string = userDetails.refreshToken;
                const respuesta = await axios.post(api() + auth.refresh, {refreshToken: refresh}, {
                    headers: {
                        "Authorization": `Bearer ${userDetails.token}`,
                        "Accept": "application/json"
                    }
                });
                const userLogged = {
                    token: respuesta.data.accessToken,
                    refreshToken: respuesta.data.refreshToken
                }
                const datos: string = JSON.stringify(userLogged);
                addCookie('userLogged', datos, res, req);
                if (bodyParams == undefined) {
                    await post(req, res, endpoint);
                } else {
                    await post(req, res, endpoint, bodyParams);
                }
            }
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg, obj};
};
