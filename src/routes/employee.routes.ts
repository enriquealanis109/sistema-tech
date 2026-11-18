import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeesId,
} from "../controllers/employee.controller.js";
import { validateEmployee } from "../middlewares/validate.employee.js";

const router: Router = Router();

router.post("/employees", validateEmployee, createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeesId);

export default router;
