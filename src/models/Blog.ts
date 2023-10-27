import {Schema, model} from "mongoose";

const blogSchema: Schema = new Schema({
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
    user: {
        type: Schema.Types.ObjectId, ref: "User"
    },
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

export default model("Blog", blogSchema);