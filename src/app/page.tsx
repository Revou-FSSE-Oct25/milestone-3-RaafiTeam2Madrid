
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types/product';


async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  
  if (!res.ok) {
    throw new Error('Gagal mengambil data produk');
  }
  
  return res.json();
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Katalog Produk</h1>
        <p className="text-gray-600">Belanja barang impianmu di sini</p>
      </div>

      {}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}