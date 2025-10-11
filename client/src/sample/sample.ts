// File: sampleProducts.ts

// Dữ liệu chi tiết sản phẩm Gretsch gốc
const gretschData: any = {
    "Category": "Guitars", 
    "Collection": "Acoustic Guitars", 
    "Brand": "Gretsch", 
    "Product Name": "Gretsch G5022CE Rancher Jumbo Acoustic Electric Guitar, RW FB, Savannah Sunset", 
    "Price": "16.830.000₫", 
    // Giữ nguyên Description gốc
    "Description": "A great Gretsch® guitar returns with the Rancher acoustic guitars. The richly resonant Rancher first appeared in the early 1950s with a highly distinctive triangular sound hole and sweepingly elegant pickguard, and Gretsch is now very proud to reintroduce the model with its classic features intact. ... (Mô tả chi tiết đã được rút gọn)", 
    "Images": [
        "https://www.sweelee.com.vn/cdn/shop/files/products_2FG21-271-4022-522_2FG21-271-4022-522_1745224763750.jpg?v=1750942980&width=2048", 
    ], 
    "stock_quantity": 7
};

// Định nghĩa cấu trúc (interface) sản phẩm
export interface SimpleProduct {
    id: number;
    name: string;
    price: string;
    image: string[];
    status: 'Có hàng' | 'Hết hàng';
    brand?: string;
    description: string;
}

const originalDescription = gretschData.Description; 

const sampleProducts: SimpleProduct[] = [];

// 1. Thêm sản phẩm Gretsch (ID 1)
sampleProducts.push({
    id: 1,
    name: gretschData["Product Name"],
    price: gretschData.Price, 
    image: gretschData.Images,
    status: gretschData.stock_quantity > 0 ? 'Có hàng' : 'Hết hàng',
    brand: 'Gretsch',
    description: originalDescription 
});

for (let i = 2; i <= 100; i++) {
    const randomPrice = (Math.floor(Math.random() * 200) + 100) * 1000;
    
    sampleProducts.push({
        id: i,
        name: gretschData["Product Name"],
        brand: gretschData.Brand,
        price: `${randomPrice.toLocaleString('vi-VN')}₫`,
        image: gretschData.Images,
        status: Math.random() > 0.1 ? 'Có hàng' : 'Hết hàng',
        description: originalDescription 
    });
}

export default { sampleProducts, gretschData };