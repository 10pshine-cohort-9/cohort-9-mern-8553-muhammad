const request = require("supertest");
const app = require("../src/app");
describe("Authentication API", () => {
    test("should register a new user successfully", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("User registered successfully");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body.user.name).toBe("Test User");
        expect(response.body.user.email).toBe("test@example.com");
    });
    test("should not register an existing user", async () => {
        await request(app)
            .post("/auth/register")
            .send({
                name: "Duplicate User",
                email: "duplicate@example.com",
                password: "password123"
            });
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "Duplicate User",
                email: "duplicate@example.com",
                password: "password123"
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("User already exists");
    });
    test("should login successfully with valid credentials", async () => {
        await request(app)
            .post("/auth/register")
            .send({
                name: "Login User",
                email: "login@example.com",
                password: "password123"
            });
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "login@example.com",
                password: "password123"
            });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Login successful");
        expect(response.body).toHaveProperty("token");
        expect(typeof response.body.token).toBe("string");
    });
    test("should not login with invalid password", async () => {
        await request(app)
            .post("/auth/register")
            .send({
                name: "Invalid Login User",
                email: "invalid@example.com",
                password: "password123"
            });
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "invalid@example.com",
                password: "wrongpassword"
            });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email or password");
    });
    test("should get user profile with a valid token", async () => {
        await request(app)
            .post("/auth/register")
            .send({
                name: "Profile User",
                email: "profile@example.com",
                password: "password123"
            });
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "profile@example.com",
                password: "password123"
            });
        const token = loginResponse.body.token;
        const response = await request(app)
            .get("/auth/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Profile User");
        expect(response.body.email).toBe("profile@example.com");
        expect(response.body.password).toBeUndefined();
    });
    test("should not access profile without a token", async () => {
        const response = await request(app)
            .get("/auth/profile");
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(
            "Access denied. No token provided."
        );
    });
});