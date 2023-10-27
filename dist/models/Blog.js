"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});
exports.default = (0, mongoose_1.model)("Blog", blogSchema);
//# sourceMappingURL=Blog.js.map