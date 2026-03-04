import { Product } from "@/types/product";

const BASE_URL = "https://v2.api.noroff.dev/online-shop";

export async function getProducts(): Promise<Product[]> {
	const res = await fetch(BASE_URL);
	if (!res.ok) throw new Error("Failed to fetch products");
	const json = await res.json();
	return json.data;
}
