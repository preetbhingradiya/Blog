import express from 'express'
import { route } from './routes/router.js'
import { userData } from './config/db.js'
import { config } from 'dotenv'
import cookie from 'cookie-parser'
import  path  from 'path'
import { Authenticate } from './middleware/passport.js'
import passport from 'passport'
import session from 'express-session'

config({path:".env"})
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(path.resolve(),"public")))
Authenticate(passport)
app.use(session({secret:"secret"}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookie())


app.use(route)

app.listen(process.env.PORT,()=>{
    console.log(`connect on port ${process.env.PORT}`);
    userData()
})