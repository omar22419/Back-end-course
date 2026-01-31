import express from "express";
import { noteRouter, userRouter } from "./Modules/index.js";
import { checkDBConnection } from './DB/connection.db.js';
import { port } from '../config/config.service.js'


export default async function bootstrap() {
  const app = express();
  app.use(express.json());
    await checkDBConnection();

  app.use("/users", userRouter);
  app.use("/notes", noteRouter);

  app.all("/*dummy", (req, res) => {
    return res.status(404).json({
      message: "Not Found Handler",
    });
  });

   app.use((error, req, res, next) => {
        const status = error.cause?.status ?? 500
        return res.status(status).json({
            error_message:
                status == 500 ? 'something went wrong' : error.message ?? 'something went wrong'
        })
    })

  app.listen(port, () => console.log(`Server running on port ${port}`));
}
