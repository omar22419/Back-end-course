import express from "express";
import { globalErrorHandling } from "./common/utils/response/error.response.js";
import { connectDB } from "./DB/index.js";
import { authRouter } from "./Modules/Auth/index.js";
const bootstrap = async (req, res) => {
  const port = 3000;
  const app = express();
  app.use(express.json());
  await connectDB();

  app.use("/auth", authRouter);

  app.use("/*dummy", (req, res) => {
    return res.status(404).json({
      message: "Invalid application routing",
    });
  });

  app.use(globalErrorHandling);

  app.listen(port, () => {
    console.log(`The server is running on port: ${port}`);
  });
};

export default bootstrap;
