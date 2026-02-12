'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product'; 

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data:", err);
        setLoading(false);
      });
  }, []);

  
  const handleDelete = async (id: number) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(products.filter((p) => p.id !== id));
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });
      
      alert('Produk berhasil dihapus!');
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">Sedang memuat data produk...</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Produk</h1>
        <Link 
          href="/admin/create" 
          className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
        >
          + Tambah Produk
        </Link>
      </div>

      {}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">Gambar</th>
              <th className="px-6 py-3">Nama Produk</th>
              <th className="px-6 py-3">Kategori</th>
              <th className="px-6 py-3">Harga</th>
              <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 border-t border-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="h-12 w-12 overflow-hidden rounded border bg-white p-1">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="h-full w-full object-contain"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.title}
                </td>
                <td className="px-6 py-4 capitalize">
                  {product.category}
                </td>
                <td className="px-6 py-4 text-green-600 font-bold">
                  ${product.price}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    {}
                    <Link 
                      href={`/admin/edit/${product.id}`} 
                      className="rounded bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700 hover:bg-yellow-200"
                    >
                      Edit
                    </Link>
                    {}
                    <button 
                      onClick={() => handleDelete(product.id)}
                      className="rounded bg-red-100 px-3 py-1 text-xs font-bold text-red-700 hover:bg-red-200"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <p className="py-8 text-center text-gray-500">Tidak ada produk ditemukan.</p>
        )}
      </div>
    </div>
  );
}