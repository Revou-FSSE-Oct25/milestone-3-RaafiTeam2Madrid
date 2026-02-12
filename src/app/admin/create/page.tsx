
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'electronic',
    image: 'https://i.pravatar.cc', 
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    
    await fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(formData),
    });

    alert('Produk berhasil ditambahkan! (Simulasi)');
    router.push('/admin'); 
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Tambah Produk Baru</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nama Produk</label>
          <input 
            type="text" required
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Harga ($)</label>
          <input 
            type="number" required
            className="w-full border p-2 rounded"
            onChange={(e) => setFormData({...formData, price: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Deskripsi</label>
          <textarea 
            className="w-full border p-2 rounded"
            rows={3}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          {loading ? 'Menyimpan...' : 'Simpan Produk'}
        </button>
      </form>
    </div>
  );
}