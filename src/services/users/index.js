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

export default blogRouter