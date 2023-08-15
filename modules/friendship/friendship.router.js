import { Router } from "express";
import * as friendshipController from "./friendship.controller.js";

const router = Router();

router.get("/", friendshipController.getFriendRequests);
router.post("/add/:id", friendshipController.addFriend);
router.patch("/accept/:id", friendshipController.acceptFriend);
router.delete("/remove-request/:id", friendshipController.removeFriendRequest);
router.delete("/remove-friend/:friendId", friendshipController.removeFriend);

export default router;
