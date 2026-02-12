
'use client';

import { useEffect, useState, use } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams(); 
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

 
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  });

  
  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            title: data.title,
            price: data.price,
            description: data.description,
            category: data.category,
            image: data.image,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error('Gagal ambil data:', err);
          alert('Produk tidak ditemukan!');
          router.push('/admin');
        });
    }
  }, [id, router]);

  
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);


    await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    alert('Produk berhasil diperbarui!');
    router.push('/admin'); 
    router.refresh(); 
    setSubmitting(false);
  };

  if (loading) return <p className="p-10 text-center">Mengambil data produk...</p>;

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Edit Produk (ID: {id})</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Nama Produk</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Harga ($)</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Kategori</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {}
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-700">Deskripsi</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded bg-blue-600 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-blue-300"
          >
            {submitting ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
          
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded bg-gray-200 py-2 font-bold text-gray-700 hover:bg-gray-300"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}