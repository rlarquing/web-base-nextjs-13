import {useAppSelector} from "./use-app-selector.hook";
import {RootState} from "../redux/store";

export const useStore = () => useAppSelector((state: RootState) => state);
