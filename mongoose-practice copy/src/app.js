const mongoose = require("mongoose");
const validator = require("validator");
mongoose.connect('mongodb://localhost:27017/mynewDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(console.log("connection established"))
    .catch(error => {
        console.log("connection failed ")
    })
//schema
const studentSchema = new mongoose.Schema({
    name: { 
        type: String, 
        require: true, 
        trim: true, 
        lowercase: true, 
        maxlength: 7,
        minlength:[3 , 'name lenth should have min length 3']
    },
    active:{ 
        type: Boolean,
        enum: [ true, false]
    },
    email:{
        type: String, 
        validate(value){
            if(! validator.isEmail(value) ){
                throw new Error ("Email is invalid")
            }
        }
    },
    age: {
        type: Number,
        validate(value){
           if(value < 0){
               throw new Error("Age value can't be negative")
           }
       }
    },
    DOB: {
        type: Date,
        default: Date.now
    }

})
// collection creation
const Student = mongoose.model("Student", studentSchema)

const StudentDocument = async () => {
    try {
        const std1 = new Student({
            name: "IQRA",
            age: 22,
            active: true,
            email: 'iqra@gmail.com'
        })
        const std2 = new Student({
            name: "mutahira",
            age: 22,
            active: true

        })
        const std3 = new Student({
            name: "sami",
            age: 25,
            active: true

        })
        // TO INSERT ONE DOC
        const result = await std1.save()

        // TO INSERT MANY DOCS 
        //const result = await Student.insertMany([std1, std2, std3])
        console.log(result)
    }
    catch (error) {
        console.log("error in inserting data", error)
    }
}
StudentDocument()

const getStudents = async () => {
    try {
        //const result = await Student.find()
        //const result = await Student.find({name:"shanza"}
        //const result = await Student.find({ name: "shanza" }).select({ name: 1 }).limit(1)

        const result = await Student.findOne({ name: "shanza" }).select({ name: 1 })

        //console.log(result)
    }
    catch (error) {
        console.log("error in get students", error)
    }

}


//getStudents()


//comparison Query operators
const getStd = async () =>{
    try{
        const gtAge = await Student.find({ age: {$gt : 20 }})
        const gteAge = await Student.find({age : {$gte: 23}})
        const ltAge = await Student.find({age: {$lt : 23}})
        const InAge = await Student.find({age : {$in : [22 , 27]}})

        //console.log( "gtAge" , gtAge)
        //console.log( "gteAge" , gteAge)
        console.log( "ltAge" , ltAge)
        console.log("InAge"  , InAge)
    }
    catch(error){
        console.log(error)
    }
}

 //getStd()

 const logicalStd = async () =>{
     try{
             const orOperator = await Student.find({ $or : [{name: "shanza"} , {name: "sami"}]})
             const andOperator = await Student.find({ $and : [{name: "shanza"} , {age: 23}]})
             const notOperator = await Student.find({
                 name:  {
                     $not : {
                         $in : ["shanza" , "sami"]
                         // we have to do negation 
                     }
                 }
            })
            const norOperator = await Student.find({$nor : [{name: "aayza"}, {active:false}]}) // dono main sy kuch be hoya tu wo chez nahi output hoge
             //console.log("Result of OR operator " , orOperator)
             //console.log("Result of And operator " , andOperator)
            //console.log("Result of Not operator" , notOperator)
            //console.log("Result of Nor Operator " , norOperator)
            }
     catch(error){
         console.log(error)
     }

 }
 //logicalStd()
const updateStd = async () => {
    try {
        //const updateOneResult = await Student.updateOne(
            const findOneAndUpdate = await Student.findOneAndUpdate(
            { // filter
                _id: "610b990c5f674775b6aef9ac"
            } , 
            {  // update
                $set : { 
                    name:"sehar",
                    age:24,
                    active:true
            }},
            { 
                // options
                new: true, 
                useFindAndModify : false
            }
        
        )
       // console.log("Result of UpdateOne " , updateOneResult)
       console.log( "Result of findOneAndUpdate"  , findOneAndUpdate)
    }
    catch(error){
        console.log("error in updateOne"  , error)
    }
}

 //updateStd()
const deleteOneStd = async () =>{
    try{
        const deleteOne = await Student.deleteOne({_id: "610aa17c326caf1a29e14939"})
        console.log("Result of deleteOne" , deleteOne)
    }
    catch(error){
        console.log("error in delete" , error)
    }
}

 //deleteOneStd()

 const deleteManyStd = async () =>{
    try{
        const deleteMany = await Student.deleteMany({_id: { $in : ["610bb094e62acd1dd0de8324" ,"610bb094e62acd1dd0de8325" ]}})
        console.log("Result of deleteMany" , deleteMany)
    }
    catch(error){
        console.log("error in delete" , error)
    }
}

//deleteManyStd()

const countdocumnets = async () =>{
    try{
        const countDoc = await Student.countDocuments()
        console.log("count of doc " , countDoc)
    }
    catch(error){
        console.log("error in count documnets"  , error)
    }
}


 //countdocumnets()

const sortdoc = async () =>{
    try{
        //
        const stdSort = await Student.find().sort({name: 1}).select({name:1})
        console.log("Result of Sort the Documents ", stdSort)
    }
    catch(error){
     console.log("Error in Sort the Documents" , error)
    }
}

 //sortdoc()