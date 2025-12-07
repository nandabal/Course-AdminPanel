const express = require('express');
const router = express.Router();
const courseModel = require('../model/courseModel');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const courses = await courseModel.find();
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// router.post('/add', async (req, res) => {
//     try {
//         await courseModel.create(req.body);
//         res.status(200).send({ message: "Course feedback added successfully" });
//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// });

router.post('/add', async (req, res) => {
    try {
        const newCourse = new courseModel({
            cId: req.body.cId,
            cName: req.body.cName,
            cDuration: req.body.cDuration,
            feedback: {
                rating: req.body.feedback.rating,
                comments: req.body.feedback.comments
            }
        });
        await newCourse.save();
        res.status(201).send({ message: "Course added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
        await courseModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ message: "Course details updated successfully" });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await courseModel.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
