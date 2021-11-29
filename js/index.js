const express = require("express");
const path = require("path")
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/categories-all", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/category/all.json"));
});

app.get("/category-info", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/category/1234.json"));
});

app.get("/products-all", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/product/all.json"));
});

app.get("/product-info", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/product/5678.json"));
});

app.get("/product-comments", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/product/5678-comments.json"));
});

app.get("/publish-product", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/product/publish.json"));
});

app.get("/cart-article-single", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/cart/987.json"));
});

app.get("/cart-article-2", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/cart/654.json"));
});

app.get("/cart-buy-mssg", (req, res) => {
    res.sendFile(path.join(__dirname, "../ecommerce-api-master/cart/buy.json"));
});

app.listen(3000, () => {
    console.log("Servidor funcionando!")
});
