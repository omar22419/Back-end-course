import dotenv from "dotenv";
import { userRouter, postRouter, commentRouter, authRouter } from "./modules/index.js";
import { checkDBConnection } from "./DB/connection.db.js";
dotenv.config({
  path: "./config/dev.env",
});

const bootstrap = async(app, express) => {
  app.use(express.json());

  await checkDBConnection();


  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);



    app.all("/*dummy", (req,res,next)=>{
      console.log('hi')
        res.status(404).json({message:"Not found Handler!!"});
    })
};

export default bootstrap;
