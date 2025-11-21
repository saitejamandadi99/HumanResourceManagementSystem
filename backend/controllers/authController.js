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
        const hashedPassword = bcrypt.hash(password,10)
        const newUser = await Users.create({
            organisation_id:newOrg.id , name: adminName, email, password_hash : hashedPassword
        })
        await Logs.create({organisation_id:newOrg.id, user_id: newUser.id, action : `User '${newUser.id}' created organisation '${newOrg.id}'`})
        const token = jwt.sign({user_id:newUser.id, organisation_id: newOrg.id}, process.env.JWT_SECRET, {expiresIn:'8h'});
        return res.status(200).json({message: 'User created'})

    } catch (error) {
        console.log('registration error', error.message)
        return res.status(500).json({message: error.message})
    }
}