"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/services/api";
import { Product } from "@/types/product";

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		async function fetchProducts() {
			const data = await getProducts();
			setProducts(data);
		}

		fetchProducts();
	}, []);

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Products</h1>
			<pre>{JSON.stringify(products, null, 1)}</pre>
		</main>
	);
}
