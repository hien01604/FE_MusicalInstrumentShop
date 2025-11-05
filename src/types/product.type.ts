export interface IBrand{
    brand_id: number;
    name: string;
    slug: string;
    description: string | null;
}

export interface IGroupedBrand{
    initial: string;
    brands: IBrand[];
}

export interface IProductImage {
    id: number;
    image_url: string;
    is_main: boolean;
    created_at: string; 
}

export interface IProduct {
    id: number;
    brand: IBrand; 
    images: IProductImage[]; 
    product_name: string;
    slug: string;
    price_display: string;
    description: string;
    price_numeric: string;
    stock_quantity: number;
    specifications: Record<string, any>;
    created_at: string;
    updated_at: string;
}

export interface IPaginatedData<T> {
    data: T[]; 
    
    total: number;
    currentPage: number;
    limit: number;
    totalPages: number;

    entityName: string;
    entitySlug: string;
    entityType: 'brand' | 'category'; 
}

export interface ICategoryItem {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
}

export interface IParentCategory extends ICategoryItem {
  subcategories: ICategoryItem[];
}