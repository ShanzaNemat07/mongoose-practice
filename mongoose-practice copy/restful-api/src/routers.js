const express = require('express');

const router = new express.Router();
const Student = require('./models/student-M')

router.post("/student", async (req, res) => {
    console.log(req.body)

    try {

        const std = new Student(req.body)
        const createStd = await std.save()
        if (!createStd) {
            res.status(404).send({
                message: "Error in Creating student",
                data: createStd
            })
        }
        res.status(201).send({
            message: "Success",
            data: createStd
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error creating student",
            error: error
        })
    }
})
router.get("/students", async (req, res, next) => {

    try {
        const students = await Student.find()
        if (!students) {
            res.status(404).send({
                message: "Error in fetching Students data", data: {}
            })
        }
        res.status(200).send({
            message: "Success",
            data: students
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in getting student",
            error: error
        })
    }

})
router.delete('/student/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const deleteStd = await Student.findByIdAndDelete({ _id })

        if (!deleteStd) {
            res.status(404).send({
                message: "Error in deleting",
                data: deleteStd
            })
            console.log("here in if ")
        }
        res.status(200).send({
            message: "Delete Successfully",
            data: deleteStd
        })
        console.log("here in try ")
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in deleting the record",
            error: error
        })
    }
})
router.patch('/student/:id',  async (req, res) => {
    try {
        const _id = req.params.id
        const updateStd = await Student.findOneAndUpdate({ _id }, { $set: { address: req.body.address } }, { new: true })
        if (!updateStd) {
            res.status(404).send({
                message: "Error in update resquest",
                data: {}
            })
        }
        res.status(204).send()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error in update record",
        })
    }

})
router.put('/student/:id', async (req, res) => {
    try {
        const updateStd= await Student.findOneAndUpdate({_id: req.params.id} , 
            { $set:
                { 
                    name: req.body.name,
                    phoneNumber: req.body.phoneNumber,
                    address: req.body.address,
                    email: req.body.email,
                }
            },
            {new : true}
        )

        if(!updateStd){
            res.status(404).send({
                message: "Error in update request",
                data: {}
            })
        }
        res.status(204).send()
    } 
    catch (error) {
        console.log(error)
        res.send(500).send({
            message: "Error in updateRequest"
        })
    }
})


module.exports = router