import { 
    GraphQLObjectType, 
    GraphQLList, 
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,   
    GraphQLID,
} from 'graphql';

// const bcrypt = require('bcryptjs');
import {hashSync, compareSync} from 'bcryptjs';


import User from '../models/Users';
import Blog from '../models/Blog';
import Comment from '../models/Comment';
import { UserType, BlogType, CommentType } from '../schema/schema';
import {Document, startSession} from "mongoose";

let DocumentType = Document<any, any, any>;

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
                let existingUser: DocumentType;
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
                let existingUser: DocumentType;
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
        },
        addBlog: {
            type: BlogType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString)},
                content: { type: new GraphQLNonNull(GraphQLString)},
                // date: { type: new GraphQLNonNull(GraphQLString)},
                user: { type: new GraphQLNonNull(GraphQLID)},
                
            }, 
            async resolve(parent, {title, content, user}){
                let blog: Document<any, any, any>;
                const session = await startSession();
                try {
                    session.startTransaction({session});
                    blog = new Blog({title, content, user});
                    const existingUser = await User.findById(user);
                    if(!existingUser) return new Error("User not found");
                    existingUser.blogs.push(blog);
                    await existingUser.save({session});
                    return await blog.save({session});
                } catch (e) {
                    console.log(e.message);
                } finally {
                    await session.commitTransaction();
                }
            }
        }, 
        updateBlog: {
            type: BlogType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
                title: { type: new GraphQLNonNull(GraphQLString)},
                content: { type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, {id, title, content}){
                let existingBlog: DocumentType;
                try {
                    existingBlog = await Blog.findById(id);
                    if (!existingBlog) return new Error("Blog does not exist");
                    return await Blog.findByIdAndUpdate(id, {
                        title, content
                    }, 
                    {new: true}
                    )
                    
                } catch (e) {
                    console.log(e.message);
                    
                }
            }
        },
        deleteBlog: {
            type: BlogType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID)},
            },
            async resolve(parent, {id}) {
                let existingBlog: DocumentType;
                const session = await startSession();
                try {
                    session.startTransaction({ session });
                    existingBlog = await Blog.findById(id).populate("user");
                    //@ts-ignore
                    const existingUser = existingBlog?.user;
                    if(!existingUser) return new Error("No user linked to this blog");
                    if(!existingBlog) return new Error("No blog found")
                    existingUser.blogs.pull(existingBlog);
                    await existingUser.save({session});
                    //@ts-ignore
                    return await existingBlog.remove({session});
                } catch (e) {
                    console.log(e.message);
                } finally {
                    session.commitTransaction();
                }
            }
        }
    }
})
 

export default new GraphQLSchema({query: RootQuery, mutation: mutations});