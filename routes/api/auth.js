const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
const router = express.Router();

const User = require('../../models/User');

//route get api/items
router.post('/', (req,res)=>{
  const {email,password,avatar} = req.body;

  if(!password|| !email) {
      return res.status(400).json({msg:'please enter all fields'})

  }

  User.findOne({ email })
  .then(user => {
      if(!user) res.status(400).json({msg:`we can't find this user`});

   
      //validate password
      bcrypt.compare(password,user.password,avatar)
      .then(isMatch => {
          if(!isMatch) res.status(400).json({msg:'the password is invalid'});
          jwt.sign(
            {id:user.id, avatar: user.avatar},
            config.get('jwtSecret'),
            {expiresIn:3600},
            (err,token)=>{
        if(err) throw err;
        res.json({
            token,
            user: {
                id:user.id,
                name:user.name,
                email:user.email,  email:user.email,
                mobile:user.mobile,
                sex:user.sex,
                lastName:user.lastName,
        
            }
        })
            }
        )

      })
  })
});
router.get('/user', auth , (req,res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
});
module.exports = router;