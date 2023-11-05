"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
// const bcrypt = require('bcryptjs');
const bcryptjs_1 = require("bcryptjs");
const Users_1 = __importDefault(require("../models/Users"));
const Blog_1 = __importDefault(require("../models/Blog"));
const Comment_1 = __importDefault(require("../models/Comment"));
const schema_1 = require("../schema/schema");
const mongoose_1 = require("mongoose");
let DocumentType = (mongoose_1.Document);
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // Get all users
        users: {
            type: new graphql_1.GraphQLList(schema_1.UserType),
            async resolve() {
                return await Users_1.default.find();
            }
        },
        // Get user by id
        user: {
            type: schema_1.UserType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                return Users_1.default.findById(id).populate("blogs");
            },
        },
        // Get all blogs
        blogs: {
            type: new graphql_1.GraphQLList(schema_1.BlogType),
            async resolve() {
                return await Blog_1.default.find();
            }
        },
        // Get blog by id
        blog: {
            type: schema_1.BlogType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                return await Blog_1.default.findById(id).populate("user comments");
            }
        },
        // Get all comments
        comments: {
            type: new graphql_1.GraphQLList(schema_1.CommentType),
            async resolve() {
                return await Comment_1.default.find();
            }
        },
    }
});
const mutations = new graphql_1.GraphQLObjectType({
    name: 'mutations',
    fields: {
        // user Signup
        signup: {
            type: schema_1.UserType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { name, email, password }) {
                let existingUser;
                try {
                    existingUser = await Users_1.default.findOne({ email });
                    if (existingUser)
                        return new Error("User already exists");
                    //Hash password
                    const securePassword = (0, bcryptjs_1.hashSync)(password);
                    const user = new Users_1.default({ name, email, password: securePassword });
                    return await user.save();
                }
                catch (e) {
                    return new Error(`User Signup Failed. Try again ${e}`);
                }
            }
        },
        // user login
        login: {
            type: schema_1.UserType,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { email, password }) {
                let existingUser;
                try {
                    existingUser = await Users_1.default.findOne({ email });
                    if (!existingUser)
                        return new Error("No user Registered with this email");
                    const decryptedPassword = (0, bcryptjs_1.compareSync)(password, 
                    // @ts-ignore                        
                    existingUser?.password);
                    if (!decryptedPassword)
                        return new Error("Incorrect password");
                    return existingUser;
                }
                catch (err) {
                    console.log(err.message);
                }
            }
        },
        addBlog: {
            type: schema_1.BlogType,
            args: {
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                // date: { type: new GraphQLNonNull(GraphQLString)},
                user: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { title, content, user }) {
                let blog;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    blog = new Blog_1.default({ title, content, user });
                    const existingUser = await Users_1.default.findById(user);
                    if (!existingUser)
                        return new Error("User not found");
                    existingUser.blogs.push(blog);
                    await existingUser.save({ session });
                    return await blog.save({ session });
                }
                catch (e) {
                    console.log(e.message);
                }
                finally {
                    await session.commitTransaction();
                }
            }
        },
        updateBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                title: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                content: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { id, title, content }) {
                let existingBlog;
                try {
                    existingBlog = await Blog_1.default.findById(id);
                    if (!existingBlog)
                        return new Error("Blog does not exist");
                    return await Blog_1.default.findByIdAndUpdate(id, {
                        title, content
                    }, { new: true });
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        },
        // delete blog
        deleteBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingBlog;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    existingBlog = await Blog_1.default.findById(id).populate("user");
                    //@ts-ignore
                    const existingUser = existingBlog?.user;
                    if (!existingUser)
                        return new Error("No user linked to this blog");
                    if (!existingBlog)
                        return new Error("No blog found");
                    existingUser.blogs.pull(existingBlog);
                    await existingUser.save({ session });
                    //@ts-ignore
                    return await existingBlog.deleteOne({ id: existingBlog.id });
                }
                catch (e) {
                    console.log(e.message);
                }
                finally {
                    session.commitTransaction();
                }
            }
        },
        // add comment to blog
        addCommentToBlog: {
            type: schema_1.CommentType,
            args: {
                blog: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                user: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                text: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            async resolve(parent, { blog, user, text }) {
                const session = await (0, mongoose_1.startSession)();
                let comment;
                try {
                    session.startTransaction({ session });
                    const existingUser = await Users_1.default.findById(user);
                    const existingBlog = await Blog_1.default.findById(blog);
                    if (!existingBlog || !existingUser)
                        return new Error("User or Blog does not exist");
                    comment = new Comment_1.default({ text, blog, user });
                    existingUser.comments.push(comment);
                    existingBlog.comments.push(comment);
                    await existingBlog.save({ session });
                    await existingUser.save({ session });
                    return await comment.save({ session });
                }
                catch (err) {
                    return new Error(err.message);
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
        // Delete a comment from blog
        deleteComment: {
            type: schema_1.CommentType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) }
            },
            async resolve(parent, { id }) {
                let comment;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    comment = await Comment_1.default.findById(id);
                    if (!comment)
                        return new Error("Comment not found");
                    //@ts-ignore
                    const existingUser = await Users_1.default.findById(comment?.user);
                    if (!existingUser)
                        return new Error("User not found");
                    //@ts-ignore
                    const existingBlog = await Blog_1.default.findById(comment?.blog);
                    if (!existingBlog)
                        return new Error("Blog not found");
                    existingUser.comments.pull(comment);
                    existingBlog.comments.pull(comment);
                    await existingUser.save({ session });
                    await existingBlog.save({ session });
                    //@ts-ignore
                    return await comment.deleteOne({ id: comment.id });
                }
                catch (err) {
                    return new Error(err.message);
                }
                finally {
                    await session.commitTransaction();
                }
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
//# sourceMappingURL=handlers.js.map