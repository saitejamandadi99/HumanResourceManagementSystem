const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../models/users')
const Organisations = require('../models/organisations')
const Logs = require('../models/logs')

const registerUser = async (req , res)=>{
    try {
        const {orgName, adminName, email, password} = req.body
        if(!orgName || !adminName || !email || !password){
            return res.status(401).json({message: 'Requires all details to create a user'})
        }

        const existingOrgName = await Organisations.findOne({where:{name:orgName}})
        if (existingOrgName){
            return res.status(403).json({message:'Organisation already exists'})
        }
        const newOrg = await Organisations.create({name:orgName})
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await Users.create({
            organisation_id:newOrg.id , name: adminName, email, password_hash : hashedPassword
        })
        await Logs.create({organisation_id:newOrg.id, user_id: newUser.id, action : `User '${newUser.id}' created organisation '${newOrg.id}'`})
        const token = jwt.sign({user_id:newUser.id, organisation_id: newOrg.id}, process.env.JWT_SECRET, {expiresIn:'8h'});
        return res.status(200).json({message: 'User created', token:token})

    } catch (error) {
        console.log('registration error', error.message)
        return res.status(500).json({message: error.message})
    }
}

const loginUser = async (req, res)=>{
    try {
        const {orgName, email, password} = req.body 
        if (!orgName || !email || !password){
            return res.status(401).json({message: 'Requires all details to create a user'})
        }
        const organisation = await Organisations.findOne({where:{name:orgName}})
        if(!organisation){
            return res.status(404).json({message: 'Organisation not found'})
        }
        const existingUser = await Users.findOne({where:{email:email, organisation_id:organisation.id}});
        if(!existingUser){
            return res.status(404).json({message:'User not found'})
        }
        const isPassMatched = await bcrypt.compare(password, existingUser.password_hash)
        if(!isPassMatched){
            return res.status(401).json({message: "Invalid password"})
        }
        const token = jwt.sign({user_id: existingUser.id, organisation_id: organisation.id}, process.env.JWT_SECRET, {expiresIn:'8h'})
        await Logs.create({
            organisation_id:organisation.id, 
            user_id:existingUser.id, 
            action:`User '${existingUser.id}' logged in.`,
        timestamp: new Date(),
        })
        return res.status(200).json({message:"User Logged In", token:token})
    } catch (error) {
        console.log('Login error', error.message)
        return res.status(500).json({message: error.message})
    }

}

module.exports = {registerUser, loginUser}