import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from './src/routes/authRoutes';
import { syncDatabase } from "./src/models";
import todoRoutes from "./src/routes/todoRoutes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
dotenv.config();

const PORT = process.env.PORT || 10000;

const app = express();


app.use(express.json());
app.use(cors());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ToDo List API",
      version: "1.0.0",
      description: "API for managing tasks (CRUD operations)",
    },
    servers: [
      {
        url: "https://challengeback-production-5b58.up.railway.app",
      },
    ],
  },
  apis: ["./controllers/todoController.js"], 
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', authRoutes);
app.use('/api/todos', todoRoutes);

syncDatabase()



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app
