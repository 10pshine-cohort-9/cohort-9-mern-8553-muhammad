const request = require("supertest");
const app = require("../src/app");
let cookies;
beforeEach(async () => {
    try {
        const email = `noteuser_${Date.now()}_${Math.floor(
            Math.random() * 100000
        )}@example.com`;
        await request(app)
            .post("/auth/register")
            .send({
                name: "Note User",
                email,
                password: "password123"
            });
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email,
                password: "password123"
            });
        cookies = loginResponse.headers["set-cookie"];
    } catch (error) {
        throw new Error(
            `beforeEach authentication setup failed: ${error.message}`
        );
    }
});
describe("Notes API", () => {
    test("should create a note successfully", async () => {
        try {
            const response = await request(app)
                .post("/notes")
                .set("Cookie", cookies)
                .send({
                    title: "My First Note",
                    content: "This is a test note."
                });
            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe(
                "Note created successfully"
            );
            expect(response.body.note).toHaveProperty("_id");
            expect(response.body.note.title).toBe("My First Note");
            expect(response.body.note.content).toBe(
                "This is a test note."
            );
        } catch (error) {
            throw new Error(
                `should create a note successfully failed: ${error.message}`
            );
        }
    });
    test("should get all notes", async () => {
        try {
            const beforeResponse = await request(app)
                .get("/notes")
                .set("Cookie", cookies);
            expect(beforeResponse.statusCode).toBe(200);
            expect(Array.isArray(beforeResponse.body)).toBe(true);
            const beforeCount = beforeResponse.body.length;
            const createResponse = await request(app)
                .post("/notes")
                .set("Cookie", cookies)
                .send({
                    title: "Test Note",
                    content: "Test Content"
                });
            expect(createResponse.statusCode).toBe(201);
            const response = await request(app)
                .get("/notes")
                .set("Cookie", cookies);
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(beforeCount + 1);
        } catch (error) {
            throw new Error(
                `should get all notes failed: ${error.message}`
            );
        }
    });
    test("should get a note by id", async () => {
        try {
            const createResponse = await request(app)
                .post("/notes")
                .set("Cookie", cookies)
                .send({
                    title: "Test Note",
                    content: "Test Content"
                });
            const noteId = createResponse.body.note._id;
            const response = await request(app)
                .get(`/notes/${noteId}`)
                .set("Cookie", cookies);
            expect(response.statusCode).toBe(200);
            expect(response.body._id).toBe(noteId);
            expect(response.body.title).toBe("Test Note");
        } catch (error) {
            throw new Error(
                `should get a note by id failed: ${error.message}`
            );
        }
    });
    test("should update a note", async () => {
        try {
            const createResponse = await request(app)
                .post("/notes")
                .set("Cookie", cookies)
                .send({
                    title: "Old Title",
                    content: "Old Content"
                });
            const noteId = createResponse.body.note._id;
            const response = await request(app)
                .put(`/notes/${noteId}`)
                .set("Cookie", cookies)
                .send({
                    title: "Updated Note",
                    content: "Updated Content"
                });
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe(
                "Note updated successfully"
            );
            expect(response.body.updatedNote.title).toBe(
                "Updated Note"
            );
            expect(response.body.updatedNote.content).toBe(
                "Updated Content"
            );
        } catch (error) {
            throw new Error(
                `should update a note failed: ${error.message}`
            );
        }
    });
    test("should delete a note", async () => {
        try {
            const createResponse = await request(app)
                .post("/notes")
                .set("Cookie", cookies)
                .send({
                    title: "Delete Note",
                    content: "Delete Content"
                });
            const noteId = createResponse.body.note._id;
            const response = await request(app)
                .delete(`/notes/${noteId}`)
                .set("Cookie", cookies);
            expect(response.statusCode).toBe(200);
            expect(response.body.message).toBe(
                "Note deleted successfully"
            );
        } catch (error) {
            throw new Error(
                `should delete a note failed: ${error.message}`
            );
        }
    });
    test("should reject unauthenticated access", async () => {
        try {
            const response = await request(app).get("/notes");
            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe(
                "Access denied. No token provided."
            );
        } catch (error) {
            throw new Error(
                `should reject unauthenticated access failed: ${error.message}`
            );
        }
    });
});