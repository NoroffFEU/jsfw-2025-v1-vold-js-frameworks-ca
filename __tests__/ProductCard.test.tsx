import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";
import { describe, expect, it } from "@jest/globals";

const mockProduct: Product = {
	id: "1",
	title: "Test Product",
	description: "Test description",
	price: 100,
	discountedPrice: 80,
	image: {
		url: "https://example.com/image.jpg",
		alt: "Test image",
	},
	rating: 5,
};

describe("ProductCard", () => {
	it("renders the product title", () => {
		render(<ProductCard product={mockProduct} />);
		expect(screen.getByText("Test Product")).toBeTruthy();
	});
});
