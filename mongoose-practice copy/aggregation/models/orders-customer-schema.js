const mongoose = require('mongoose');
  
const orderSchema = new mongoose.Schema({
    
    customerId: String,
    itemName: String
})
  
const customerSchema = new mongoose.Schema({
   
    name: String,
    city: String
})
  
const Order = new mongoose.model('order', orderSchema);
const Customer = new mongoose.model('customer', customerSchema);
  
module.exports = { Order, Customer };