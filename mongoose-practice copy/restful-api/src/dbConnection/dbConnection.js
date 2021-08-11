const mongoose = require('mongoose');
//mongodb://localhost:27017/mynewDb
mongoose.connect("mongodb://localhost:27017/StudentDB" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( console.log("Connection build"))
.catch(error => {
    console.log("Error: " + error);
})


