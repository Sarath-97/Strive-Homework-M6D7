import express from "express"
import listEndpoints from "express-list-endpoints"
import  mongoose  from "mongoose"
import blogRouter from "./services/users/index.js"

const server = express()

const PORT = process.env.PORT || 3001

server.use(express.json())

/* **************ROUTES ***************** */

server.use("/blogs",blogRouter)

/* **************ERROR HANDLERS***************** */




/* ************MONGOOSE CONNECTION************* */
mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("Connected", () => {
    console.log("Connection Successful to mongo!");
    server.listen(PORT, () => {
        console.table(listEndpoints(server));
        console.log(`Server is running on port ${PORT}`)
    })
})

mongoose.connection.on("error", err => {
    console.log("MONGO ERROR ", err);
})