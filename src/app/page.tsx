"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/api";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState("default");

	useEffect(() => {
		async function load() {
			try {
				setLoading(true);
				setError(null);

				const data = await getProducts();
				setProducts(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Unknown error");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, []);

	if (loading) return <main className="p-6">Loading…</main>;
	if (error) return <main className="p-6">Error: {error}</main>;

	const filteredProducts = products
		.filter((product) =>
			product.title.toLowerCase().includes(search.toLowerCase()),
		)
		.sort((a, b) => {
			if (sortBy === "name") {
				return a.title.localeCompare(b.title);
			}

			if (sortBy === "price-low") {
				return (a.discountedPrice ?? a.price) - (b.discountedPrice ?? b.price);
			}

			if (sortBy === "price-high") {
				return (b.discountedPrice ?? b.price) - (a.discountedPrice ?? a.price);
			}

			return 0;
		});

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Products</h1>

			<div className="mb-6 flex flex-col gap-4 md:flex-row">
				<input
					type="text"
					placeholder="Search products..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="border p-2 rounded"
				/>

				<select
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}
					className="border p-2 rounded"
				>
					<option value="default">Sort by</option>
					<option value="name">Name A-Z</option>
					<option value="price-low">Price low to high</option>
					<option value="price-high">Price high to low</option>
				</select>
			</div>

			{filteredProducts.length === 0 && (
				<p className="mb-4">No products found.</p>
			)}

			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</main>
	);
}
