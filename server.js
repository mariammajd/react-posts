const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express();

app.use(express.json());
const db= config.get('mongoURI');
mongoose.connect(db,{
    useCreateIndex:true,
})
.then(()=>console.log('mongo db is connected'))
.catch(err=>console.log(err));

app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));