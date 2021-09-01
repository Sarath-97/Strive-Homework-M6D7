import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    author: {
      name: { type: String, required: true },
      avatar: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema({
  text: { type: String, required: true},
  author: { type: String, required: true}
}, { 
  timestamps: true 
})

export default model("Blogs", blogSchema);
export const CommentModel = model("Comment", commentSchema)
