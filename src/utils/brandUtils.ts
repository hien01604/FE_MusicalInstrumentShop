import type { IBrand, IGroupedBrand } from "../types/product.type";

export const groupBrandsByInitial = (brands: IBrand[]): IGroupedBrand[] => {
    
    const grouped = brands.reduce((acc, brand) => {
        const initial = brand.name.charAt(0).toUpperCase();

        acc[initial] = acc[initial] || []; 
        
        acc[initial].push(brand);
        
        return acc;
    }, {} as { [key: string]: IBrand[] }); 

    const result: IGroupedBrand[] = Object.keys(grouped)
        .sort() 
        .map((initial) => ({
            initial,
            brands: grouped[initial].sort((a, b) => a.name.localeCompare(b.name)),
        })); 
        
    return result;
};