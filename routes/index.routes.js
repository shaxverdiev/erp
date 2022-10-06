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
const getFileController = require("../controllers/get_file.controller")
const deleteFileController = require("../controllers/delete_file.controller")
const updateFileController = require("../controllers/update_file.controller")
const getFileListController = require("../controllers/get_file_list.controller")
const downloadFileController = require("../controllers/download_file.controller")

router.post("/signup", signupController);
router.post("/signin", signinController);
router.get("/signin/new_token", newTokenController);

router.post("/upload", [authMW, uploadMW.single("file")], uploadController);
router.get('/file/:id', authMW, getFileController)
router.delete('/file/delete/:id', authMW, deleteFileController)
router.put('/file/update/:id',[authMW, uploadMW.single("file")], authMW, updateFileController)
router.get('/file/all/list', authMW, getFileListController)
router.get('/file/download/:id', authMW, downloadFileController)

router.get("/info", authMW, infoController);
router.get("/logout", authMW, logoutController);

module.exports = router;
