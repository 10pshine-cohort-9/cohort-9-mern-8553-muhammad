import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test } from "vitest";
import Home from "./Home";
function renderHome() {
    return render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );
}
describe("Home", () => {
    test("renders the main heading", () => {
        renderHome();
        expect(
            screen.getByRole("heading", {
                name: "Notes App",
                level: 1
            })
        ).toBeInTheDocument();
    });
    test("renders the Get Started link", () => {
        renderHome();
        const link = screen.getByRole("link", {
            name: "Get Started"
        });
        expect(link).toHaveAttribute(
            "href",
            "/register"
        );
    });
    test("renders the Login link", () => {
        renderHome();
        const link = screen.getByRole("link", {
            name: "Login"
        });
        expect(link).toHaveAttribute(
            "href",
            "/login"
        );
    });
    test("renders all feature sections", () => {
        renderHome();
        expect(
            screen.getByRole("heading", {
                name: "Create Notes",
                level: 2
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", {
                name: "Stay Organized",
                level: 2
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("heading", {
                name: "Access Anywhere",
                level: 2
            })
        ).toBeInTheDocument();
    });
});