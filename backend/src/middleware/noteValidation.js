const validateNote = (req, res, next) => {
    req.body = req.body || {};
    const { title, content } = req.body;
    const errors = [];
    if (!title || typeof title !== "string") {
        errors.push({
            field: "title",
            message: "Title is required"
        });
    } else {
        const trimmedTitle = title.trim();
        if (trimmedTitle.length < 3) {
            errors.push({
                field: "title",
                message: "Title must be at least 3 characters long"
            });
        }
        if (trimmedTitle.length > 100) {
            errors.push({
                field: "title",
                message: "Title cannot exceed 100 characters"
            });
        }
        req.body.title = trimmedTitle;
    }
    if (!content || typeof content !== "string") {
        errors.push({
            field: "content",
            message: "Content is required"
        });
    } else {
        const trimmedContent = content.trim();
        if (trimmedContent.length < 5) {
            errors.push({
                field: "content",
                message: "Content must be at least 5 characters long"
            });
        }
        if (trimmedContent.length > 1000) {
            errors.push({
                field: "content",
                message: "Content cannot exceed 1000 characters"
            });
        }
        req.body.content = trimmedContent;
    }
    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation failed",
            errors
        });
    }
    next();
};
module.exports = validateNote;