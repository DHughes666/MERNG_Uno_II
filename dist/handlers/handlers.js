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
        // Get all blogs
        blogs: {
            type: new graphql_1.GraphQLList(schema_1.BlogType),
            async resolve() {
                return await Blog_1.default.find();
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
            },
            async resolve(parent, { title, content }) {
                let blog;
                try {
                    blog = new Blog_1.default({ title, content });
                    return await blog.save();
                }
                catch (e) {
                    console.log(e.message);
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
        deleteBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingBlog;
                try {
                    existingBlog = await Blog_1.default.findById(id);
                    if (!existingBlog)
                        return new Error("No blog found");
                    return await Blog_1.default.findByIdAndRemove(id);
                }
                catch (e) {
                    console.log(e.message);
                }
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
//# sourceMappingURL=handlers.js.map