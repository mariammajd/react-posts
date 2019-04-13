const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')
const router = express.Router();

const User = require('../../models/User');

//route get api/items
router.post('/', (req,res)=>{
  const {name,email,password,lastName,sex,mobile,} = req.body;

  if( !name|| !password|| !email || !sex || !lastName || !mobile) {
      return res.status(400).json({msg:'please enter all fields'})

  }

  User.findOne({ email })
  .then(user => {
      if(user) res.status(400).json({msg:'user already exists'});
     
      const newUser = new User ({
name,
email,
password, 
sex,
mobile,
lastName,
      });
      //create salt and hash
      bcrypt.genSalt(10, (err, salt)=> {
          bcrypt.hash(newUser.password,salt,(err,hash) => {
if (err) throw err;
newUser.password= hash;
newUser.save()
.then(user => {

jwt.sign(
    {id:user.id},
    config.get('jwtSecret'),
    {expiresIn:3600},
    (err,token)=>{
if(err) throw err;
res.json({
    token,
    user: {
        id:user.id,
        name:user.name,
        email:user.email,
        mobile:user.mobile,
        sex:user.sex,
        lastName:user.lastName,
        avatar:user.avatar,

    }
})
    }
)

});
          })
      })

  })
});

//get api/auth/user
//

module.exports = router;