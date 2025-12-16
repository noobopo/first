import { userSchema } from "../models/user"

export default defineEventHandler(async(event)=>{
    const user = await userSchema.find()
    return{
        message : "hello World",
        users : user
    }
})

// import { userSchema } from "../models/user";

// export default eventHandler(async(event)=>{
//     const body  = await readBody(event)
//     await userSchema.create(body)
//     // console.log(body);
//     return{
//         message : "data submited",
//         date : body
//     }
// })