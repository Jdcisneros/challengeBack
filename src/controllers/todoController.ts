import { Response } from "express";
import Todo from "../models/Todo";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task with the provided title and description
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Internal server error
 */

export const createTodo = async (req: AuthRequest, res: Response)  => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      completed: false,
      userId,
    });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};


/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all tasks
 *     description: Get all tasks for the authenticated user
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of tasks
 *       401:
 *         description: Unauthorized user
 *       500:
 *         description: Internal server error
 */

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user"});
      return;
    }

    const todos = await Todo.findAll({ where: { userId } });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error getting tasks", error });
  }
};


/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a task by ID
 *     description: Retrieve a specific task by its ID
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task found
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

export const getTodoById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: "Task not found"});
      return;
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error getting task", error });
  }
};


/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a task
 *     description: Update the title, description, and completion status of a task
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await todo.update({ title, description, completed });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       401:
 *         description: Unauthorized user
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: "Unauthenticated user" });
      return;
    }

    const todo = await Todo.findOne({ where: { id, userId } });
    if (!todo) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    await todo.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};
