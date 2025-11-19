import { clientApi } from "../api.customize";
// import type { IBackendRes } from "../../types/common.type"; // <-- Loại bỏ khỏi Promise type
import type { IBrand, ICategoryItem, IPaginatedData, IProduct } from "../../types/product.type";

const API_Backend_base = import.meta.env.VITE_API_BASE_URL;

export const getAllBrandAPI = (): Promise<IBrand[]> => {
    const urlBackend = `${API_Backend_base}/api/v1/brands`;
    return clientApi.get(urlBackend);
}

export const getBrandBySlugAPI = (slug: string): Promise<IPaginatedData<IProduct>> => { 
    const urlBackend = `${API_Backend_base}/api/v1/products/brands/${slug}`;
    return clientApi.get(urlBackend);
}

export const getCategoryBySlugAPI = (slug: string): Promise<IPaginatedData<IProduct>> => { 
    const urlBackend = `${API_Backend_base}/api/v1/products/categories/${slug}`;
    return clientApi.get(urlBackend);
}

export const getDetailProductAPI = (slug: string): Promise<IProduct> => {
    const urlBackend = `${API_Backend_base}/api/v1/products/${slug}`;
    return clientApi.get(urlBackend);
}

export const getAllCategoryAPI = (): Promise<ICategoryItem[]> => { 
    const urlBackend = `${API_Backend_base}/api/v1/categories`;
    return clientApi.get(urlBackend);
}