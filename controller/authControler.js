const {users} = require('../models')
const {hashPassword, comparePassword} = require('../config/bcrypt')
const generateToken = require('../config/bcrypt')
const { errorResponse, 
    ValidationErrorResponse,
     internalErrorResponse, 
     notFoundResponse,
     succesResponse
    } = require('../config/response')
const { where } = require('sequelize')

async function reqister(req,res){
    const {username,email, password} = req.body;
}


async function reqister(req,res){
    const { username, email, password} = req.body

    try{
        const existingEmail = await users.findOne({
            where: {
                email
            }
        });
        if (existingEmail) errorResponse(res, 'Email already exist', 400);
        const hashPassword = await generateToken.hashPassword(password);
        const user = await users.create ({
            username,
            email,
            password:hashPassword
        });
        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updateAt: user.updateAt
        };
        succesResponse(res, 'Register succesfully', user);
    }catch(error){
        console.error(error);
        internalErrorResponse(res, error)
    }
}
