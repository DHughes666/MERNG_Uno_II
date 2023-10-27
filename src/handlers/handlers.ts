import { 
    GraphQLObjectType, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,   
} from 'graphql';

// const bcrypt = require('bcryptjs');
import {hashSync, compareSync} from 'bcryptjs';


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
                    if (existingUser) return new Error("User already exists")
                    //Hash password
                    const securePassword = hashSync(password)
                    const user = new User({name, email, password: securePassword});
                    return await user.save();
                } catch(e) {
                    return new Error(`User Signup Failed. Try again ${e}`);
                    
                }
            }
        },
        // user login
        login: {
            type: UserType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, {email, password}) {
                let existingUser: Document<any, any, any>;
                try {
                    existingUser = await User.findOne({email})
                    if(!existingUser) 
                    return new Error("No user Registered with this email");
                    const decryptedPassword = compareSync(
                        password,
                        // @ts-ignore                        
                        existingUser?.password);
                    if(!decryptedPassword)
                    return new Error("Incorrect password")
                    return existingUser;
                } catch (err) {
                    console.log(err.message);
                    
                }
            }
        }
    }
})
 

export default new GraphQLSchema({query: RootQuery, mutation: mutations});