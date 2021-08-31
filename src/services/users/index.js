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

export default blogRouter