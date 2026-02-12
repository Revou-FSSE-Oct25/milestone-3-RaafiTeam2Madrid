
'use client'; 

import { Product } from '@/types/product';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
 
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="flex flex-col justify-between rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md">
      {}
      <div className="mb-4 flex h-48 items-center justify-center overflow-hidden rounded bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      {}
      <div className="flex flex-1 flex-col">
        <h3 className="mb-2 text-sm font-bold text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        <p className="mb-4 text-xs text-gray-500 capitalize">{product.category}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          
          {}
          <button
            onClick={() => addToCart(product)}
            className="rounded bg-blue-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-blue-700 active:scale-95"
          >
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}