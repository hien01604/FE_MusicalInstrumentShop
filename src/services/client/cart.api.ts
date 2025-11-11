import type { IInitialCartSyncRequest, IInitialCartSyncResponse } from "../../types/cart.type";
import type { IBackendRes } from "../../types/common.type";
import { clientApi } from "../api.customize";

export const initialCartSyncAPI = (data: IInitialCartSyncRequest): Promise<IBackendRes<IInitialCartSyncResponse>> => {
    const urlBackend = "/api/v1/cart/sync/initial"; 
    return clientApi.post(urlBackend, data);
}