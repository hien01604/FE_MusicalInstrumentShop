import { clientApi } from "../api.customize";
import type { IBackendRes } from "../../types/common.type";
import type { IBrand } from "../../types/product.type";

const API_Backend_base = import.meta.env.VITE_API_BASE_URL;

export const getAllBrandAPI = (): Promise<IBackendRes<IBrand[]>> => {
    const urlBackend = `${API_Backend_base}/api/v1/brands`;
    return clientApi.get(urlBackend);
}