const express = require("express")
const controller = require("../controllers/Controller")
const router = express.Router()


router.post("/register" , controller.Register)
router.get("/show" , controller.Show)
router.patch("/update" , controller.Update)
router.post("/login" , controller.Login)
router.get("/search" , controller.Search)
router.get("/history" , controller.ShowHistory)
router.get("/getuser" , controller.getUser)









module.exports = router;

