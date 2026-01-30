import Link from "next/link";

export default function Home({ products }) {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ marginBottom: 24 }}>Product Listing</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 24,
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #e5e5e5",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                height: 160,
                objectFit: "contain",
                marginBottom: 12,
              }}
            />

            <div>
              <Link href={`/product/${p.id}`}>
                <h3
                  style={{
                    fontSize: 16,
                    marginBottom: 8,
                    cursor: "pointer",
                  }}
                >
                  {p.title}
                </h3>
              </Link>

              <p style={{ fontWeight: "bold" }}>${p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return {
    props: { products },
    revalidate: 60,
  };
}
