"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
	product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
	const { addToCart } = useCart();

	return (
		<button
			onClick={() => {
				addToCart(product);
				toast.success("Added to cart");
			}}
			className="mt-4 border px-4 py-2 rounded"
		>
			Add to Cart
		</button>
	);
}
