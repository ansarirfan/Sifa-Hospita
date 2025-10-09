// import jwt from "jsonwebtoken"


// // doctor authentication middleware
// const docAuth = async (req, res, next)=>{
//     try {
//          const {dtoken} = req.headers 
//         if (!dtoken) {
//           return  res.json({success:false, msg:"Not Authorized Login Again"})
//         }
//         const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
//         req.body.docId = token_decode.id
//         next()
//     } catch (error) {
//         console.log(error);
//         res.json({success:"false", msg:error.message})
//     }
// }

// export default docAuth

import jwt from "jsonwebtoken"

// doctor authentication middleware
const docAuth = async (req, res, next) => {
    try {
        const dtoken = req.headers.dtoken || req.headers.dToken // Accept both cases
        console.log("Doctor Token:", dtoken); // Debug log
        
        if (!dtoken) {
            return res.json({ success: false, msg: "Not Authorized Login Again" })
        }
        
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)
        console.log("Decoded Token:", token_decode); // Debug log
        
        req.body.docId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, msg: error.message })
    }
}

export default docAuth
