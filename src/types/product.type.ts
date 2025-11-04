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