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

	if (loading) {
		return (
			<main className="p-6">
				<p role="status" aria-live="polite">
					Loading products…
				</p>
			</main>
		);
	}

	if (error) {
		return (
			<main className="p-6">
				<p role="alert">Error: {error}</p>
			</main>
		);
	}

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
			<h1 className="mb-4 text-2xl font-bold">Products</h1>

			<section aria-labelledby="product-filters-heading" className="mb-6">
				<h2 id="product-filters-heading" className="sr-only">
					Product filters
				</h2>

				<div className="flex flex-col gap-4 md:flex-row">
					<div className="flex flex-col gap-1">
						<label htmlFor="product-search" className="text-sm font-medium">
							Search products
						</label>

						<input
							id="product-search"
							type="search"
							placeholder="Search products..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="rounded border border-gray-300 bg-white p-2 text-gray-900 placeholder:text-gray-500"
						/>
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="product-sort" className="text-sm font-medium">
							Sort products
						</label>

						<select
							id="product-sort"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="rounded border border-gray-300 bg-white p-2 text-gray-900"
						>
							<option value="default">Default</option>
							<option value="name">Name A-Z</option>
							<option value="price-low">Price low to high</option>
							<option value="price-high">Price high to low</option>
						</select>
					</div>
				</div>
			</section>

			<p className="mb-4 text-sm text-gray-600" aria-live="polite">
				Showing {filteredProducts.length} of {products.length} products.
			</p>

			{filteredProducts.length === 0 ? (
				<p className="mb-4">
					No products found. Try a different search term or sorting option.
				</p>
			) : (
				<div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</main>
	);
}
