
const express = require('express');
const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
//connecting with db
require('../../DbConnection/conn')
// Importing Models Order and Customer from model.js

const { Customer , Order } = require("../models/orders-customer-schema");

app.post('/customer' ,async (req ,res , next) =>{
	console.log(req.body.name , req.body.city)
	try {
		const cust = new Customer(req.body)
		const customer = await cust.save()
		if(!customer){
			res.status(404).send({
				message:"Error 404"
			})
		}
		res.status(200).send({
			message:"success",
			data: customer
		})

	} catch (error) {
		console.log(error)
	}
})
// app.post('/orders' ,async (req ,res , next) =>{
// 	console.log(req.body.customerId , req.body.itemName)
// 	try {
// 		const order = new Order(req.body)
// 		const cOrder = await order.save()
// 		if(!cOrder){
// 			res.status(404).send({
// 				message:"Error 404"
// 			})
// 		}
// 		res.status(200).send({
// 			message:"success",
// 			data: cOrder
// 		})

// 	} catch (error) {
// 		console.log(error)
// 	}
// })

// Implementing $lookup for customers collection
Customer.aggregate([
{
	$lookup: {
	from: "orders",
	localField: "no",
	foreignField: "custNO",
	as: "orders",
	},
},
// Deconstructs the array field from the
// input document to output a document
// for each element
// {
// 	$unwind: "$orders",
// },
])
.then((result) => {
	console.log(result);
})
.catch((error) => {
	console.log(error);
});


app.listen(port, () => {
    console.log(`Listensing on port ${port}`)
})