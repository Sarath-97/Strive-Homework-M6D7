import express from "express"
import createError from "http-errors"

import BlogModel from "./schema.js"

const blogRouter = express.Router()

blogRouter.post('/', async (req, res, next)=> {
    try {
        const newBlog = new BlogModel(req.body)
        const {_id} = await newBlog.save()

        res.status(201).send(`My unique id: ${_id}`)
    } catch (error) {
        next(error)
    }
})

blogRouter.get("/", async(req,res,next) => {
    try {
      
      const blogs = await BlogModel.find({})
  
      res.send(blogs)
      
    } catch (error) {
      next(error)
    }
  })

  blogRouter.get("/:blogId", async(req,res,next) => {
    try {
      
      const blogId = req.params.blogId

    const blog = await BlogModel.findById(blogId) // similar to findOne()

    if(blog){

      res.send(blog)
    }
      
    } catch (error) {
      next(error)
    }
  })

  blogRouter.put("/:blogId", async(req,res,next) => {
    try {
      const blogId = req.params.blogId
  
      const modifiedblog = await BlogModel.findByIdAndUpdate(blogId, req.body, {
        new: true // returns the modified blog
      })
  
      if(modifiedblog){
        res.send(modifiedblog)
      } else {
        next(createError(404, `blog with id ${blogId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

  blogRouter.delete("/:blogId", async(req,res,next) => {
    try {
      const blogId = req.params.blogId
  
      const deletedblog = await BlogModel.findByIdAndDelete(blogId)
  
      if(deletedblog){
        res.status(204).send()
      } else {
        next(createError(404, `blog with id ${blogId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

  /* *********************CRUD FOR COMMENTS INTO BLOG**************** */
  blogsRouter.post("/:id", async(req,res,next) => { 
    try {  
      const newComment = new CommentModel(req.body)
      const updatedBlog = await BlogModel.findByIdAndUpdate(
        req.params.id, 
        { $push: { comments: newComment } },
        { new : true }
        )
        if (updatedBlog) {
          res.send(updatedBlog)
        } else {
          next(createError(404, `Blog Post with id ${req.params.id} not found`))
        }   
    } catch (error) {
        next(error)
    }
})

blogsRouter.get("/:id/comments", async(req,res,next) => { // D8 returns all the comments for the specified blog post
  try {
    const Blog = await BlogModel.findById(req.params.id)       
    if (Blog) {
      res.send(Blog.comments)
    } else {
      next(createError(404, `Blog Post with id ${req.params.id} not found`))
    }
  } catch (error) {
  next(error)
  }
})

blogsRouter.get("/:id/comments/:c_id", async(req,res,next) => { // D8 returns a single comment for the specified blog post
  try {       
    const Blog = await BlogModel.findById(req.params.id)  
    if (Blog) {
      const comment = Blog.comments.find(c => c._id.toString() === req.params.c_id)
      if (comment) {
        res.send(comment)
      } else {
        next(createError(404, `Comment with id ${req.params.c_id} not found in blog post`))
      }
    } else {
      next(createError(404, `Blog Post with id ${req.params.id} not found`))
    }  
  } catch (error) {
    next(error)
  }
})





export default blogRouter