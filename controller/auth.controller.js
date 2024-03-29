import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const hashedPass = await bcrypt.hash(password, 10)
        const createUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPass
            }
        })
        res.status(200).json({ message: "User Created Successfully!" }) 
    }catch(e){
res.status(500).json({message:"Error while creating the user!"})
    }
}

export const login = (req, res) => {
    res.status(200).send('login endpoint')
}

export const logout = (req, res) => {
    res.status(200).send('logout endpoint')
}