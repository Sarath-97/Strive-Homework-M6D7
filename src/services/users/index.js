import express from "express"
import createError from "http-errors"

import blogModel from "./schema.js"

const blogRouter = express.Router()

blogRouter.post('/', async (req, res, next)=> {
    try {
        const newBlog = new blogModel(req.body)
        const {_id} = await newBlog.save()

        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
})

usersRouter.get("/", async(req,res,next) => {
    try {
      
      const users = await UserModel.find({})
  
      res.send(users)
      
    } catch (error) {
      next(error)
    }
  })

export default blogRouter