import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const discountedPrice = product.discountedPrice;

	const hasDiscount =
		typeof discountedPrice === "number" && discountedPrice < product.price;

	const discountPercentage = hasDiscount
		? Math.round(((product.price - discountedPrice) / product.price) * 100)
		: 0;

	return (
		<Link
			href={`/products/${product.id}`}
			className="block h-full focus:outline-none focus:ring-2 focus:ring-[#404040] focus:ring-offset-2"
		>
			<div className="relative flex h-full flex-col p-3">
				{discountPercentage > 0 && (
					<span className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white">
						-{discountPercentage}%
					</span>
				)}

				<img
					src={product.image.url}
					alt={product.image.alt || product.title}
					className="mb-2 aspect-square w-full object-cover"
				/>

				<h2 className="font-semibold">{product.title}</h2>

				{hasDiscount ? (
					<p>
						Price: ${discountedPrice}{" "}
						<span className="text-gray-500 line-through">${product.price}</span>
					</p>
				) : (
					<p>Price: ${product.price}</p>
				)}

				<p>Rating: {product.rating}</p>
			</div>
		</Link>
	);
}
