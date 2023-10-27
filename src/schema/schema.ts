 import { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLNonNull,
    GraphQLList,
} from 'graphql';
import Blog from '../models/Blog';
import User from '../models/Users';
import Comment from '../models/Comment';


export const UserType = new GraphQLObjectType({
    name: "UserType",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString)},
        password: { type: new GraphQLNonNull(GraphQLString)},
        blogs: {
            type: new GraphQLList(BlogType),
            async resolve(parent) {
                return await Blog.find({
                    user: parent.id
                });
            },
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve(parent) {
                return await Comment.find({
                    user: parent.id
                });
            },
        },
        
    }),
});

export const BlogType = new GraphQLObjectType({
    name: "BlogType",
    fields: () => ({
        id: { type: GraphQLID},
        title: { type: new GraphQLNonNull(GraphQLString)},
        content: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString)},
        user: {
            type: UserType,
            async resolve(parent) {
                return await User.findById(parent.user);
            },
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve(parent) {
                return await Comment.find({
                    blog: parent.id
                });
            },
        },
    }),
});

export const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        id: { type: GraphQLID},
        text: { type: new GraphQLNonNull(GraphQLString)},
        user: {
            type: UserType,
            async resolve(parent) {
                return await User.findById(parent.user);
            },
        },
        blog: {
            type: BlogType,
            async resolve(parent) {
                return await Blog.findById(parent.blog);
            },
        },
    }),
})