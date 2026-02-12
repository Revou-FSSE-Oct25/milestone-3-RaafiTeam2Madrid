
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6 text-2xl font-bold">Admin Panel</div>
        <nav className="space-y-2 px-4">
          <Link href="/admin" className="block rounded px-4 py-2 hover:bg-gray-700">
            Dashboard Produk
          </Link>
          <Link href="/admin/create" className="block rounded px-4 py-2 hover:bg-gray-700">
            + Tambah Produk
          </Link>
          <Link href="/" className="block rounded px-4 py-2 text-gray-400 hover:text-white">
            ← Kembali ke Toko
          </Link>
        </nav>
      </aside>

      {}
      <main className="flex-1 bg-gray-100 p-8">
        {children}
      </main>
    </div>
  );
}