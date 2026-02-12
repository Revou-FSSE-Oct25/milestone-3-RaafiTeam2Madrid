
'use client';

import { useCartStore } from '@/store/useCartStore';
import { useEffect, useState } from 'react';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [isSuccess, setIsSuccess] = useState(false);

  
  const handlePayment = () => {

    setIsSuccess(true);
    clearCart(); 
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-green-600">Pembayaran Berhasil! </h1>
        <p className="mt-4 text-gray-600">Terima kasih sudah berbelanja di RaafiShop.</p>
        <a href="/" className="mt-6 text-blue-600 hover:underline">Kembali ke Beranda</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Checkout</h1>
      
      <div className="rounded-lg border bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Konfirmasi Pesanan</h2>
        <ul className="mb-6 space-y-2">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.title} (x{item.quantity})</span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between border-t pt-4 text-xl font-bold">
            <span>Total Bayar:</span>
            <span>${totalPrice().toFixed(2)}</span>
        </div>

        <button 
            onClick={handlePayment}
            className="mt-6 w-full rounded bg-blue-600 py-3 font-bold text-white hover:bg-blue-700"
        >
            Bayar Sekarang
        </button>
      </div>
    </div>
  );
}