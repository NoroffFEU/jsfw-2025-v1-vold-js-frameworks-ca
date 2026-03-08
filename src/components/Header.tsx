"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
	const { cartCount } = useCart();

	return (
		<header className="p-4 border-b flex justify-between items-center">
			<Link href="/" className="font-semibold">
				Shop
			</Link>

			<nav className="flex gap-4">
				<Link href="/contact">Contact</Link>

				<Link href="/cart">Cart ({cartCount})</Link>
			</nav>
		</header>
	);
}
