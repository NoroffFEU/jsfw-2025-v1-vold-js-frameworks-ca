import { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
	const response = await fetch("https://v2.api.noroff.dev/online-shop");

	if (!response.ok) {
		throw new Error("Failed to fetch products");
	}

	const data = await response.json();
	return data.data;
}
