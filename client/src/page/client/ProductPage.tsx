import Layout from "../../component/Layout";
import ProductListGrid from "../../component/ProductListGrid";
import data from "../../sample/sample";

export default function ProductPage() {
  const { sampleProducts } = data;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Danh sách sản phẩm
        </h2>

        <ProductListGrid products={sampleProducts} />
      </div>
    </Layout>
  );
}
