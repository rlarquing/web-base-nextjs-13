import { SelectOption} from "../models";

export const SelectAdapter = (obj: any): SelectOption => ({
        label: obj.label,
        value: obj.value,
});
