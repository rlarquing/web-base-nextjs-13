import {Message} from "../models";

export const MessageAdapter = (obj: any): Message => ({
        statusCode: obj.statusCode,
        type: obj.type,
        message: obj.message,
});
