const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    totalPrice: {
        type: Number
    },
    productList: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "prodcut"
        },
        priceDetails: {
            type: {
                price: {
                    type: Number
                },
                unit: {
                    type: String
                }
            }
        }
    }],
    discount: {
        type: Number
    },
    orderStatus: {
        type: String,
        enum: ["PENDING","CANCELED","COMPLETED"]
    },
    notes: {
        type: String
    },
    deliveryCharge: {
        type: Number
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    }
});

const Order = mongoose.model("order", OrderSchema)

module.exports = {Order}