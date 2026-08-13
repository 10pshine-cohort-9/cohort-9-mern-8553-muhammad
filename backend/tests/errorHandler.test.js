const errorHandler = require("../src/middleware/errorHandler");
const logger = require("../src/config/logger");
jest.mock("../src/config/logger", () => ({
    error: jest.fn()
}));
describe("Global Error Handler", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("should log the error and return 500 for unexpected errors", () => {
        const error = new Error("Database connection failed");
        const req = {
            method: "GET",
            originalUrl: "/notes"
        };
        const res = {
            headersSent: false,
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        errorHandler(error, req, res, next);
        expect(logger.error).toHaveBeenCalledWith(
            {
                err: error,
                method: "GET",
                url: "/notes",
                statusCode: 500
            },
            "Request failed"
        );
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Internal Server Error"
        });
        expect(next).not.toHaveBeenCalled();
    });
    test("should return the error message for client errors", () => {
        const error = new Error("Note not found");
        error.statusCode = 404;
        const req = {
            method: "GET",
            originalUrl: "/notes/123"
        };
        const res = {
            headersSent: false,
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();
        errorHandler(error, req, res, next);
        expect(logger.error).toHaveBeenCalledWith(
            {
                err: error,
                method: "GET",
                url: "/notes/123",
                statusCode: 404
            },
            "Request failed"
        );
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Note not found"
        });
        expect(next).not.toHaveBeenCalled();
    });
    test("should pass the error to next when headers have already been sent", () => {
        const error = new Error("Response error");
        const req = {
            method: "POST",
            originalUrl: "/notes"
        };
        const res = {
            headersSent: true
        };
        const next = jest.fn();
        errorHandler(error, req, res, next);
        expect(logger.error).toHaveBeenCalledWith(
            {
                err: error,
                method: "POST",
                url: "/notes",
                statusCode: 500
            },
            "Request failed"
        );
        expect(next).toHaveBeenCalledWith(error);
    });
});