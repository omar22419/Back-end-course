import dotenv from "dotenv";
import { userRouter, postRouter, commentRouter } from "./modules/index.js";
dotenv.config({
  path: "./config/dev.env",
});

const bootstrap = (app, express) => {
  app.use(express.json());

  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);



    app.all("/*dummy", (req,res,next)=>{
      console.log('hi')
        res.status(404).json({message:"Not found Handler!!"});
    })
};

export default bootstrap;
