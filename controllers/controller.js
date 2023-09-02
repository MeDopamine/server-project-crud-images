const { where } = require("sequelize");
const Product = require("../models/product.js");
const path = require("path");
const fs = require("fs");
const { uuid } = require('uuidv4');

module.exports.getTest = async(req,res)=>{
    try {
        const response = 'Test server'
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.getProducts = async(req,res)=>{
    try {
        const response = await Product.findAll()
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.getProductsById = async(req,res)=>{
    try {
        const response = await Product.findOne({
            where:{
                id:req.params.id
            }
        }
        )
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.saveProducts = (req,res)=>{
    
    if (req === null) return res.status(400).json({msg:"No File Upload"});
    // if (!req.files || !req.files.file) {
    //     return res.status(400).json({ msg: "No File Upload" });
    // }
    const name = req.body.title;
    const description = req.body.desc;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = uuid() + ext;
    // const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpeg', '.jpg'];
    if(!allowedType.includes(ext.toLocaleLowerCase())){
        return res.status(422).json({msg:"Invalid Image"});
    }
    if (fileSize > 5000000) {
        return res.status(422).json({msg:"Image Too Large"});
    }
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg:err.message});
        try {
            await Product.create({name: name, image: fileName, url: url, description: description});
            res.status(201).json({msg:"Product Created"})
        } catch (error) {
            console.log(error.message);
        }
    })
}

module.exports.updateProducts = async(req,res)=>{
    const product = await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"Data Not Found"});
    let fileName = "";
    if(req.files === null){
        fileName = product.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        // fileName = file.md5 + ext;
        fileName = uuid() + ext;
        const allowedType = ['.png', '.jpeg', '.jpg'];
        if(!allowedType.includes(ext.toLocaleLowerCase())){
            return res.status(422).json({msg:"Invalid Image"});
        }
        if (fileSize > 5000000) {
            return res.status(422).json({msg:"Image Too Large"});
        }
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath)

        file.mv(`./public/images/${fileName}`, (err)=>{
            if(err) return res.status(500).json({msg:err.message});
        })
    }
    
    const name = req.body.title;
    const description = req.body.desc;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;


    try {
        
        await Product.update({name: name, image: fileName, url: url, description: description},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg:"Product Updated"});
    } catch (error) {
        console.log(error.message);
    }
    
    
}

module.exports.deleteProducts = async(req,res)=>{
    const product = await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:"Data Not Found"});
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath)
        await Product.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(201).json({msg:"Product Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}