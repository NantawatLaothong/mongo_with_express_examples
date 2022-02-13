const mongoose = require('mongoose');
const {Schema} = mongoose;
const connect = async function(){
    mongoose.connect('mongodb://localhost:27017/expressMongo');
}
connect().then(res=>console.log('db connected'))
    .catch(err=>console.log(err));

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'diary']
    },
    farm: {
        type: Schema.Types.ObjectId,
        ref: 'Farm'
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;