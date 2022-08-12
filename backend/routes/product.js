const express=require('express')
const router=express.Router();

const { isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
const{deleteReview,getProductReviews,createProductReview,deleteProduct,updateProduct,getSingleProduct,getProducts,getAdminProducts,newProduct}=require('../controllers/productController')
router.route('/products').get(getProducts)
router.route('/admin/products').get(getAdminProducts);
router.route('/products/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct)
router.route('/product/:id').get(getSingleProduct)
router.route('/review').put(isAuthenticatedUser, createProductReview) 
router.route('/reviews').get(isAuthenticatedUser, getProductReviews) 
router.route('/reviews').delete(isAuthenticatedUser, deleteReview)

router.route('/admin/product/:id')
              .put(isAuthenticatedUser,authorizeRoles('admin'),updateProduct)
              .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteProduct)
                 
module.exports=router;

