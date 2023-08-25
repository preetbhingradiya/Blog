import { user } from "../model/user-schema.js"


export const Home=(req,res)=>{
    if(req.cookies.token) return res.send("BLOG PAGE")
    return res.render("register")
}

export const getRegister=(req,res)=>{
    res.render('register')
}

export const postRegister=async(req,res)=>{
    const {username}=req.body

    const matchUsername=await user.findOne({username})

    if(matchUsername) return res.status(400).json({success:false,Message:"User Can Alerdy Exit"})

    const User=await user.create(req.body)
    res.status(201).cookie("token",req.body.username,{maxAge:5*60*1000}).json({
        success:true,
        Message:"User Can Add In Blog"
    })
}

export const getLogin=(req,res)=>{
    res.render('login')
}

export const getBlog=(req,res)=>{
    if(req.user) return res.render("blog")
    return res.render('login')
}

export const postBlog=async(req,res)=>{
    req.user.blog.push(req.body)
    const blogData=await user.findByIdAndUpdate(req.user.id,req.user)
    res.redirect('/myblog')
}

export const allBlog=async(req,res)=>{
    if(req.user){
        const show=await user.find(req.user)
        res.status(200).json({
         MyAccountDetiles:(req.user)?{...show}:'',
         MyBlog:(show.map((item,index)=>(req.user)?item.blog:''))
        })
    }
    else{
        res.render('login')
    }
}