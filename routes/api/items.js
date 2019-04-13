const express = require('express');
const auth = require('../../middleware/auth')
const router = express.Router();

const Item = require('../../models/Item');

//route get api/items
router.get('/', (req,res)=>{
    Item.find()
    .sort({date: -1})
    .then(items => res.json(items))
});
//it is private
router.post('/', auth,(req,res)=>{
const newItem = new Item({
    name: req.body.name,
    description:req.body.description
});
newItem.save().then(item => res.json(item));
});

//delete is private
router.delete('/:id', auth,(req,res)=>{
   Item.findById(req.params.id)
   .then(item => item.remove().then(() => res.json({success: true})))
   .catch(err => res.status(404).json({success:false}))
    })

module.exports = router;