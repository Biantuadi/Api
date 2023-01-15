const Product = require("../models/product.model");

// Quand l'utilisateur est supprimé, tous les produits associés sont supprimés

module.exports = () => {
    // Product.deleteMany({ userId: { $exists: true } })
    //     .then((result) => { console.log(result) })

    try {
        Product.deleteMany({ userId: { $exists: true } })
            .then((result) => { console.log(result) })
            
        
    } catch (error) {
        
    }
}