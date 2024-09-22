import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { createRestaurant, getRestaurantOrder, getRestaurant, getSingleRestaurant, searchRestaurant, updateOrderStatus, updateRestaurant } from '../controller/restaurant-controller.js';
import { upload } from '../middleware/multer.js';


const router = express.Router();
router.route("/").post(isAuthenticated, upload.single("imageFile"), createRestaurant)
router.route("/").get(isAuthenticated, getRestaurant)
router.route("/").put(isAuthenticated, upload.single("imageFile"), updateRestaurant)
router.route("/order").get(isAuthenticated, getRestaurantOrder)
router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus)
router.route("/search/:SearchText").get(isAuthenticated, searchRestaurant)
router.route("/:id").put(isAuthenticated, getSingleRestaurant)
export default router