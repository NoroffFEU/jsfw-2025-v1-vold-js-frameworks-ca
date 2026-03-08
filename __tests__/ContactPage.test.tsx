import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";
import ContactPage from "@/app/contact/page";

describe("ContactPage", () => {
	it("shows validation errors when submitting empty form", () => {
		render(<ContactPage />);

		const submitButton = screen.getByRole("button", { name: /submit/i });
		fireEvent.click(submitButton);

		expect(
			screen.getByText("Full name must be at least 3 characters."),
		).toBeTruthy();
	});
});
