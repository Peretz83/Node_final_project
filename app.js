const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const port = 3000
app.use(express.json())
dotenv.config({path:"./config.env"})
mongoose.set('strictQuery', true)

mongoose.connect('mongodb://localhost:27017/finalNodeProjectDB', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true
})
.then(() => {
    // eslint-disable-next-line no-console
    console.log(` connection to mongoose  succeed ! `);
})
.catch(err => {
    // eslint-disable-next-line no-console
    console.log(err);
});

const userRouter = require("./routes/userRoutes")
app.use("/api/users",userRouter)
const cardRouter = require("./routes/cardRoutes")
app.use("/api/cards",cardRouter)

app.listen(port, ()=>console.log(`Peretz you are listening to port http://localhost:${port}/api/users`))

