import axios from "axios";
import {addCookie, getObjCookie} from "./auth-cookies.utility";
import {api} from "./api.utility";
import {auth} from "../pages/api/auth/endpoints/auth.endpoint";

export const remove = async (req: any, res: any, endpoint: string, payload?: any): Promise<any> => {
    let msg = {}; //MENSAJES
    let data: any = null;
    const userLogged: string = getObjCookie('userLogged', res, req) as string;
    let userDetails = JSON.parse(userLogged);
    let message: string = "";
    try {
        if (payload === undefined) {
            data = await axios.delete(api() + endpoint,{
                headers:{
                    "Authorization" : `Bearer ${userDetails.token}`,
                    "Accept" : "application/json"
                }
            });
        } else {
            data = await axios.delete(api() + endpoint, {
                data: payload,
                headers:{
                    "Authorization" : `Bearer ${userDetails.token}`,
                    "Accept" : "application/json"
                }
            });
        }
        if (data.status === 200 || data.status === 201) {
            if (payload === undefined){
                msg = {
                    type: "success",
                    message: `Registro eliminado correctamente.`,
                };
            }else{
                msg = {
                    type: "success",
                    message: `Registros eliminados correctamente.`,
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
                if (payload == undefined) {
                    await remove(req, res, endpoint);
                } else {
                    await remove(req, res, endpoint, payload);
                }
            }
        }
        if (error.message.indexOf(" 400") !== -1 || error.message.indexOf(" 403") !== -1 || error.message.indexOf(" 500") !== -1) {
            message = error.response.data.message;
            msg = {statusCode: error.response.data.statusCode, type: "error", message};
        }
    }
    return {msg};
};
