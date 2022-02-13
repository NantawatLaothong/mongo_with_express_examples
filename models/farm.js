const mongoose = require('mongoose');
const {Schema} = mongoose;
const connect = async function(){
    mongoose.connect('mongodb://localhost:27017/expressMongo');
}
connect().then(res=>console.log('db connected'))
    .catch(err=>console.log(err));

const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;