import express, { Router } from "express";

const router: Router = express.Router();
const controller = require("../controllers/controller");

// router.get("/");
router.post("/", controller);

module.exports = router;
