import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password,10)
    res.status(200).send(hashedPass)
}

export const login = (req, res) => {
    res.status(200).send('login endpoint')
}

export const logout = (req, res) => {
    res.status(200).send('logout endpoint')
}