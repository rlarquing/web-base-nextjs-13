import {setCookie, deleteCookie, getCookie, CookieValueTypes} from 'cookies-next';
const getOptions = (res: any, req: any): any => {
    return {
        req, res,
        maxAge: 4600,
        expires: new Date(Date.now() + 3600 * 1000),
        httpOnly: true,
        secure: process.env.APP_ENV === 'production',
        path: '/',
        sameSite: 'strict',
    }
}
export const addCookie = (cookieName: string,  dato: string, res: any, req: any): void => {
    setCookie(cookieName, dato, getOptions(res,req));
}

export const removeCookie = (cookieName: string, res: any, req: any): void => {
    deleteCookie(cookieName, { req, res });
}

export const getObjCookie = (nameObj: string, res?: any, req?: any): CookieValueTypes => {
    return getCookie(nameObj, { req, res });
}