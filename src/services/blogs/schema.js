import mongoose from "mongoose";

const { Schema, model } = mongoose;

const blogSchema = new Schema(
  {
    category: { type: String},
    title: { type: String },
    cover: { type: String },
    content:{type: String},
    readTime: {
      value: { type: Number},
      unit: { type: String},
    },
    author: { type: Schema.Types.ObjectId, ref: "Author" },
  },
  {
    timestamps: true,
  }
);

const commentSchema = new Schema({
  author: { type: String, required: true},
  text: { type: String, required: true}
}, { 
  timestamps: true 
})

export const BlogModel = model("Blogs", blogSchema);
export const CommentModel = model("Comment", commentSchema)
