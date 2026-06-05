"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
	const { cartCount } = useCart();

	return (
		<header className="border-b border-[#404040] bg-[#404040] px-6 py-4 text-white">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<Link href="/" className="text-2xl font-semibold">
					Shop
				</Link>

				<nav
					aria-label="Main navigation"
					className="flex flex-col gap-2 text-base md:flex-row md:gap-6"
				>
					<Link href="/contact" className="hover:underline">
						Contact
					</Link>

					<Link href="/cart" className="hover:underline">
						Cart ({cartCount})
					</Link>
				</nav>
			</div>
		</header>
	);
}
