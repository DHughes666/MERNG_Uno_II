"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const Users_1 = __importDefault(require("../models/Users"));
const Blog_1 = __importDefault(require("../models/Blog"));
const Comment_1 = __importDefault(require("../models/Comment"));
const schema_1 = require("../schema/schema");
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
                        return new Error("User already exist");
                    const user = new Users_1.default({ name, email, password });
                    return await user.save();
                }
                catch (e) {
                    return new Error("User Signup Failed. Try again");
                }
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery });
//# sourceMappingURL=handlers.js.map