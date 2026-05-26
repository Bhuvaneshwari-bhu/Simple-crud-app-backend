//brain of backend
const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");

app.use(cookieParser());

const mongoose = require('mongoose')
const Product = require('./models/productmodel')

const productRoute = require("./routes/product.route.js")
const authRoute = require("./routes/auth.route.js")



//middleware
app.use(express.json()) //middleware
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/api/products', productRoute)
app.use('/api/auth', authRoute)


app.get('/', (req, res) => {
    res.send("Hello from Node api : express, Nodemon is running")
})

// app.get('/api/products', async(req, res) => {
//     try {
//         const products = await Product.find({})
//         res.status(200).json(products)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// app.get('/api/products/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findById(id);
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// app.post('/api/products', async(req, res) => {
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// //update product

// app.put('/api/products/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndUpdate(id, req.body);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" })
//         }

//         const updatedProduct = await Product.findById(id);
//         res.status(200).json(updatedProduct)

//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

// //delete product
// app.delete('/api/products/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const product = await Product.findByIdAndDelete(id);

//         if (!product) {
//             return res.status(404).json({ message: "Product Not found" })
//         }

//         res.status(200).json({ message: "Product deleted Successfully" })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

//Authentication Routes
//Register



mongoose.connect("mongodb+srv://bhuvaneshwariryakala_db_user:dCfbYOrmITau90v8@backenddb.fvz5gku.mongodb.net/Node-API?appName=BackendDB")
    .then(() => {
        console.log("Connected to Database")
        app.listen(3000, () => {
            console.log("sever is running on port 3000")
        })
    })
    .catch((err) => {
        console.log(err)
    })