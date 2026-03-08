"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
	const { cartCount } = useCart();

	return (
		<header className="bg-[#404040] text-white border-b border-[#404040] px-6 py-4">
			<div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
				<Link href="/" className="text-2xl font-semibold">
					Shop
				</Link>

				<nav className="flex flex-col gap-2 md:flex-row md:gap-6 text-2xl">
					<Link href="/contact">Contact</Link>
					<Link href="/cart">Cart ({cartCount})</Link>
				</nav>
			</div>
		</header>
	);
}
