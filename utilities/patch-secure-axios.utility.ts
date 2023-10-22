import axios from "axios";
import {api} from "./api.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";
import {addCookie, getObjCookie} from "./auth-cookies.utility";

export const patch = async (req: any, res: any, endpoint: string, bodyParams: any): Promise<any> => {
    let msg = {}; //MENSAJES
    const userLogged: string = getObjCookie('userLogged', res, req) as string;
    let userDetails = JSON.parse(userLogged);
    let message: string = "";
    try {
        let data = await axios.patch(api() + endpoint, bodyParams, {
            headers:{
                "Authorization" : `Bearer ${userDetails.token}`,
                "Accept" : "application/json"
            }
        });
        if (data.status === 200 || data.status === 201) {
            if (data.data.successStatus === true) {
                msg = {
                    type: "success",
                    message: `Elemento actualizado correctamente.`,
                };
            } else {
                msg = {
                    type: "error",
                    message: data.data.message,
                };
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
                await patch(req, res, endpoint, bodyParams);
            }
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg};
};
