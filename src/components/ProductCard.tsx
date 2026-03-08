import type { Product } from "@/types/product";
import Link from "next/link";

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	return (
		<Link href={`/products/${product.id}`}>
			<div className="relative p-3 h-full flex flex-col">
				{product.discountedPrice && (
					<span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
						-
						{Math.round(
							((product.price - product.discountedPrice) / product.price) * 100,
						)}
						%
					</span>
				)}

				<img
					src={product.image.url}
					alt={product.image.alt || product.title}
					className="mb-2 w-full aspect-square object-cover"
				/>

				<h2 className="font-semibold">{product.title}</h2>

				{product.discountedPrice ? (
					<p>
						Price: ${product.discountedPrice}{" "}
						<span className="line-through text-gray-500">${product.price}</span>
					</p>
				) : (
					<p>Price: ${product.price}</p>
				)}

				<p>Rating: {product.rating}</p>
			</div>
		</Link>
	);
}
