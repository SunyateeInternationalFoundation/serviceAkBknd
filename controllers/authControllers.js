const Admin = require('../models/admin');




const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const admin = await Admin.findOne({
            email,
            password
        });
        if(admin){
            res.status(200).json({
                message: 'Login successful',
                admin
        });
    }
    }catch(error){
        res.status(500).json({
            message: 'Server error'
        });
    }
}


module.exports = {
    login
}