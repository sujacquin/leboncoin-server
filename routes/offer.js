const express = require("express");


const router = express.Router();


const Offer = require('../models/offer');


// //Create

// router.post("/department/create", async (req, res) => {
//     try {

//         const newDepartment = new Department({
//             title: req.body.title
//         });
//         await newDepartment.save();


//         res.json({
//             message: "new department created"
//         });
//     } catch (error) {
//         res.status(400).json({
//             error: error.message
//         });
//     }
// });

// Read

router.get("/offer/with-count", async (req, res) => {
    try {
        const offers = await Offer.find().skip(Number(req.query.skip)).limit(Number(req.query.limit));

        res.json({ count: offers.length, offers });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

// //Update

// router.post("/department/update", async (req, res) => {
//     try {
//         const department = await Department.findById(req.query.department);
//         console.log(department);
//         if (department !== null) {
//             department.title = req.body.title;
//             await department.save();
//             res.json({
//                 message: "Department updated"
//             });
//         } else {
//             res.status(400).json({
//                 message: "Bad request"
//             });
//         }
//     } catch (error) {
//         res.status(400).json({
//             error: error.message
//         });
//     }
// });

// //Delete

// router.post("/department/delete", async (req, res) => {
//     try {
//         //trouver les catégories
//         const deletedCats = await Category.find({
//             department: req.body.department
//         });

//         //supprimer tous les produits dans les catégories
//         for (let i = 0; i < deletedCats.length; i++) {
//             await Product.deleteMany({
//                 category: deletedCats[i].id
//             });
//         }

//         //supprimer les catégories
//         await Category.deleteMany({
//             department: req.body.department
//         });

//         //supprimer le département
//         const deptToDelete = await Department.findById(req.body.department);

//         await deptToDelete.remove();

//         res.json({
//             message: "Department and referenced categories and products removed"
//         });
//     } catch (error) {
//         res.status(400).json({
//             error: error.message
//         });
//     }
// });


module.exports = router;