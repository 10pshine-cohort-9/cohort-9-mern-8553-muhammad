import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
    beforeEach,
    describe,
    expect,
    test,
    vi
} from "vitest";
import ProtectedRoute from "./ProtectedRoute";
import { getProfile } from "../services/auth";
vi.mock("../services/auth", () => ({
    getProfile: vi.fn()
}));
beforeEach(() => {
    vi.clearAllMocks();
});
function renderProtectedRoute() {
    return render(
        <MemoryRouter initialEntries={["/protected"]}>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/protected"
                        element={<h1>Protected Content</h1>}
                    />
                </Route>
                <Route
                    path="/login"
                    element={<h1>Login Page</h1>}
                />
            </Routes>
        </MemoryRouter>
    );
}
describe("ProtectedRoute", () => {
    test("shows loading state while checking authentication", () => {
        getProfile.mockImplementation(
            () => new Promise(() => {})
        );
        renderProtectedRoute();
        expect(
            screen.getByRole("heading", {
                name: "Checking authentication..."
            })
        ).toBeInTheDocument();
    });
    test("renders protected content when authenticated", async () => {
        try {
            getProfile.mockResolvedValue({});
            renderProtectedRoute();
            expect(
                await screen.findByRole("heading", {
                    name: "Protected Content"
                })
            ).toBeInTheDocument();
            expect(getProfile).toHaveBeenCalledTimes(1);
        } catch (error) {
            throw new Error(
                "Failed to test authenticated protected route",
                {
                    cause: error
                }
            );
        }
    });
    test("redirects to login for unauthorized users", async () => {
        try {
            getProfile.mockRejectedValue({
                status: 401
            });
            renderProtectedRoute();
            expect(
                await screen.findByRole("heading", {
                    name: "Login Page"
                })
            ).toBeInTheDocument();
        } catch (error) {
            throw new Error(
                "Failed to test 401 redirect to login",
                {
                    cause: error
                }
            );
        }
    });
    test("redirects to login for forbidden users", async () => {
        try {
            getProfile.mockRejectedValue({
                status: 403
            });
            renderProtectedRoute();
            expect(
                await screen.findByRole("heading", {
                    name: "Login Page"
                })
            ).toBeInTheDocument();
        } catch (error) {
            throw new Error(
                "Failed to test 403 redirect to login",
                {
                    cause: error
                }
            );
        }
    });
    test(
        "shows an error for authentication failures other than 401 or 403",
        async () => {
            try {
                getProfile.mockRejectedValue({
                    status: 500,
                    message: "Server error"
                });
                renderProtectedRoute();
                await waitFor(() => {
                    expect(
                        screen.getByText("Server error")
                    ).toBeInTheDocument();
                });
            } catch (error) {
                throw new Error(
                    "Failed to test authentication error handling",
                    {
                        cause: error
                    }
                );
            }
        }
    );
});