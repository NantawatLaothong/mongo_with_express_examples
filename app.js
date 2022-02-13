const express = require('express');
const app = express();
const port = process.env.PORT | 3000;
const farmRouter = require('./routes/farm_router');
const productRouter = require('./routes/product_router');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// setup views
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname,'views'));
app.use('/products', productRouter);
app.use('/farms', farmRouter);

app.listen(port, ()=>{
    console.log(`app is running on port:${port}`);
})