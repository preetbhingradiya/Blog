import { Router } from "express"
import { Home, allBlog, getBlog, getLogin, getRegister, postBlog, postRegister } from "../middleware/user-controller.js"
import passport from "passport"

export const route=Router()

route.get('/',Home)
route.get('/register',getRegister)
route.post('/register',postRegister)
route.get('/login',getLogin)
route.post('/login',passport.authenticate("local",{failureRedirect:"/login",successRedirect:"blog"}))
route.get('/blog',getBlog)
route.post('/blog',postBlog)
route.get('/myblog',allBlog)




