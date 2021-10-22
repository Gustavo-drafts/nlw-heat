import { Router } from "express";
import { AuthUserController } from "./controllers/AuthUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLastMessagesController } from "./controllers/GetLastMessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuth } from "./middleware/ensureAuth";

const router = Router();

router.post("/authenticate", new AuthUserController().handle);

router.post("/messages", ensureAuth, new CreateMessageController().handle);

router.get("/messages/last", new GetLastMessagesController().handle);

router.get("/profile", ensureAuth, new ProfileUserController().handle);


export { router };