export interface IBackendRes<T = any> {
    statusCode: number; 
    message: string ; 
    error?: string; 
    data?: T; 
}