const express = require('express');
const route = express.Router()

const services = require('../services/render');
const datausercontroller = require('../controller/datausercontroller');
const indexController = require('../controller/indexController');
const loginController = require('../controller/Member/loginController');
const registerController = require('../controller/Member/registerController');
const storeUserController = require('../controller/Member/storeUserController');
const loginUserController = require('../controller/Member/loginUserController');
const logoutController = require('../controller/Member/logoutController');
const homeController = require('../controller/homeController');
const adminController = require('../controller/adminController');
const fullscreen = require('../services/renderfullscreen');

const logserverController = require('../controller/logserverController');


const redirectIfAuth = require('../middleware/redirectIfAuth');
const authMiddleware = require('../middleware/authMiddleware');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/admin/datauser', authMiddleware, services.homeRoutes);
route.get('/fullscreen', authMiddleware, fullscreen.homeRoutes);
/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)



// API
route.post('/api/users', datausercontroller.create);
route.get('/api/users', datausercontroller.find);
route.put('/api/users/:id', datausercontroller.update);
route.delete('/api/users/:id', datausercontroller.delete);

route.get('/', indexController)
route.get('/login', redirectIfAuth, loginController)
route.get('/home', authMiddleware, homeController)
route.get('/admin', authMiddleware, adminController)
route.get('/register', redirectIfAuth, registerController)
route.post('/user/register', redirectIfAuth, storeUserController)
route.post('/user/login', redirectIfAuth, loginUserController)
route.get('/logout', logoutController)

route.get('/logserver',logserverController)


module.exports = route