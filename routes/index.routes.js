const Router = require("express").Router;
const router = new Router();

const authMW = require("../middlewares/auth.middleware");
const uploadMW = require("../middlewares/upload.middleware");

const signupController = require("../controllers/signup.controller");
const signinController = require("../controllers/signin.controller");
const newTokenController = require("../controllers/new_token.controller");
const infoController = require("../controllers/info.controller");
const logoutController = require("../controllers/logout.controller");
const uploadController = require("../controllers/upload.controller");

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/signin/new_token", newTokenController);

router.post("/upload", [authMW, uploadMW.single("file")], uploadController);
// router.get('/file/:id', authMW)
// router.put('/file/update/:id', authMW)
// router.delete('/file/delete/:id', authMW)
// router.get('/file/list', authMW)
// router.get('/file/download/:id', authMW)

router.get("/info", authMW, infoController);
router.get("/logout", authMW, logoutController);

module.exports = router;
