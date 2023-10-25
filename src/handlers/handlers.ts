import { 
    GraphQLObjectType, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,   
} from 'graphql';

import User from '../models/Users';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { UserType, BlogType, CommentType } from '../schema/schema';
import {Document} from "mongoose";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // Get all users
        users: {
            type: new GraphQLList(UserType),
            async resolve() {
                return await User.find();
            }
        },
        // Get all blogs
        blogs: {
            type: new GraphQLList(BlogType),
            async resolve() {
                return await Blog.find();
            }
        },
        // Get all comments
        comments: {
            type: new GraphQLList(CommentType),
            async resolve() {
                return await Comment.find();
            }
        },
    }
});

const mutations = new GraphQLObjectType({
    name: 'mutations',
    fields: {
        // user Signup
        signup: {
            type: UserType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, {name, email, password}) {
                let existingUser: Document<any, any, any>;
                try {
                    existingUser = await User.findOne({ email });
                    if (existingUser) return new Error("User already exist")
                    const user = new User({name, email, password});
                    return await user.save();
                }catch(e) {
                    return new Error("User Signup Failed. Try again");
                    
                }
            }
        }
    }
})
 

export default new GraphQLSchema({query: RootQuery});