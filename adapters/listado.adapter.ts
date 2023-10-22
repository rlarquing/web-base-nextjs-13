import {Listado} from "../models";

export const ListadoAdapter = (obj: any): Listado => {
    const items = obj.data.items;
    for (const item of items) {
        for (const key in item) {
            if (typeof item[key] === 'object') {
                if (Array.isArray(item[key])) {
                    item[key].length > 0 ? item[key] = item[key].map((a: any) => a.dtoToString).toString() : item[key] = '';
                } else {
                    item[key] = item[key].dtoToString;
                }

            }

        }

    }
    return {
        header: obj.header,
        key: obj.key,
        data: obj.data,
    }
};
