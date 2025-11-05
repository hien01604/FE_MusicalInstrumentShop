import type { ICategoryItem, IParentCategory } from "../types/product.type";

export const groupCategoriesForMenu = (flatList: ICategoryItem[]): IParentCategory[] => {
    const rootCategories: IParentCategory[] = [];
    const childrenMap: Record<number, ICategoryItem[]> = {};
    
    flatList.forEach(item => {
        if (item.parent_id !== null) {
            const parentId = item.parent_id;
            if (!childrenMap[parentId]) {
                childrenMap[parentId] = [];
            }           
            childrenMap[parentId].push(item);
        }
    });

    flatList.forEach(item => {
        if (item.parent_id === null) {
            rootCategories.push({
            ...item,
            subcategories: childrenMap[item.id] || [], 
            } as IParentCategory);
        }
    });

  return rootCategories;
};