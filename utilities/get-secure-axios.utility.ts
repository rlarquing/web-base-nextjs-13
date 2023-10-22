import axios from "axios";
import {api} from "./api.utility";
import {addCookie, getObjCookie} from "./auth-cookies.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";

export const get = async (req: any, res: any, endpoint: string, params?: any): Promise<any> => {
    let msg = {}; //MENSAJES
    let obj = {}; //OBJETOS
    let response = null;
    const userLogged: string = getObjCookie('userLogged', res, req) as string;
    let userDetails = JSON.parse(userLogged);
    let message: string = "";
    try {
        if (params == undefined) {
            response = await axios.get(api() + endpoint, {
                headers: {
                    "Authorization": `Bearer ${userDetails.token}`,
                    "Accept": "application/json"
                }
            });
        } else {
            response = await axios.get(api() + endpoint, {
                params: params,
                headers: {
                    "Authorization": `Bearer ${userDetails.token}`,
                    "Accept": "application/json"
                }
            });
        }
        if (response.status === 200 || response.status === 201) {
            let {data} = response;
            obj = data;
        } else {
            msg = {
                type: "error",
                message: `Error, no se ha podido completar su consulta.`,
            };
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
                if (params == undefined) {
                    await get(req, res, endpoint);
                } else {
                    await get(req, res, endpoint, params);
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
