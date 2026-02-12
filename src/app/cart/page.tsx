
'use client';

import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, addToCart, decreaseQuantity, removeFromCart, totalPrice } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Keranjang Belanjamu Kosong</h2>
        <Link href="/" className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Mulai Belanja
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">Keranjang Belanja</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Daftar Barang */}
        <div className="flex-1 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-4 rounded-lg border bg-white p-4 shadow-sm md:flex-row">
              <img src={item.image} alt={item.title} className="h-24 w-24 object-contain" />
              
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="rounded bg-gray-200 px-3 py-1 font-bold hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="rounded bg-gray-200 px-3 py-1 font-bold hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>

        {}
        <div className="h-fit w-full rounded-lg border bg-white p-6 shadow-md lg:w-80">
          <h2 className="mb-4 text-xl font-bold text-gray-800">Ringkasan</h2>
          <div className="mb-4 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          
          <Link href="/checkout">
            <button className="w-full rounded bg-green-600 py-3 font-bold text-white hover:bg-green-700">
              Checkout Sekarang
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}