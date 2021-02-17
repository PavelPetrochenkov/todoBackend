var router = require('koa-router');
const { userLogin } = require('../controllers/userController');

var userRouter = router();

userRouter.post("/login", userLogin);  

module.exports = userRouter;