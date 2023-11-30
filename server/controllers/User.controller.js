const User = require("../models/User.model")

module.exports.userControllers = {
    find: async (req,res)=>{
        try {
            const {email, number} = req.body
            const candidate = await User.find({email:email, number:number});
            if(candidate.length === 0){
                return await res.status(401).json({error: "Не удалось найти такого пользователя"})
            }
           
         setTimeout(()=>{
            res.json(candidate)
        },5000)

        } catch (error) {
            res.json(error)
            console.log(error);
        }
    }
}