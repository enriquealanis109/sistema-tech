import { Router } from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeesId,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js";
import { validateEmployee } from "../middlewares/validate.employee.js";

const router: Router = Router();

router.post("/employees", validateEmployee, createEmployee);
router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeesId);
router.put("/employees/:id", validateEmployee, updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;
