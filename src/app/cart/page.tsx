"use client";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
	const { cart, removeFromCart, totalPrice } = useCart();

	return (
		<main className="p-6">
			<h1 className="text-2xl font-bold mb-4">Cart</h1>

			{cart.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				<>
					<ul className="space-y-4">
						{cart.map((item) => (
							<li key={item.id} className="border p-4 rounded">
								<h2 className="font-semibold">{item.title}</h2>
								<p>Quantity: {item.quantity}</p>
								<p>Price: ${item.discountedPrice ?? item.price}</p>
								<button
									onClick={() => removeFromCart(item.id)}
									className="mt-2 border px-3 py-1 rounded"
								>
									Remove
								</button>
							</li>
						))}
					</ul>

					<p className="mt-6 font-bold">Total: ${totalPrice.toFixed(2)}</p>
				</>
			)}
		</main>
	);
}
