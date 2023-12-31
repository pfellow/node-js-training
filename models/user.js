const mongoose = require('mongoose');
const Product = require('./product');
const Order = require('./order');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  const updatedCartItems = [...this.cart.items];
  if (cartProductIndex >= 0) {
    updatedCartItems[cartProductIndex].quantity += 1;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1
    });
  }

  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = [...this.cart.items].filter((item) => {
    return item.productId.toString() !== productId;
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

// .then(() => {
//   this.cart = { items: [] };
//   return db
//     .collection('users')
//     .updateOne(
//       { _id: new ObjectId(this.id) },
//       { $set: { cart: { items: [] } } }
//     );
// })
// .catch((err) => console.log(err));

// const { getDb } = require('../utils/database');
// const { ObjectId } = require('mongodb');

// class User {
//   constructor(username, email, cart, id) {
//     this.name = username;
//     this.email = email;
//     this.cart = cart;
//     this.id = id;
//   }
//   save() {
//     const db = getDb();
//     return db
//       .collection('users')
//       .insertOne(this)
//       .then()
//       .catch((err) => console.log(err));
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       updatedCartItems[cartProductIndex].quantity += 1;
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: 1
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems
//     };
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this.id) },
//         { $set: { cart: updatedCart } }
//       );
//   }

//   getCart() {
//     const db = getDb();
//     const productIds = this.cart.items.map((item) => item.productId);
//     return db
//       .collection('products')
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then((products) => {
//         console.log(products);
//         return products.map((product) => {
//           return {
//             ...product,
//             quantity: this.cart.items.find(
//               (item) => item.productId.toString() === product._id.toString()
//             ).quantity
//           };
//         });
//       });
//   }

//   deleteCartItem(productId) {
//     const db = getDb();
//     const updatedCartItems = [...this.cart.items].filter((item) => {
//       return item.productId.toString() !== productId;
//     });
//     return db
//       .collection('users')
//       .updateOne(
//         { _id: new ObjectId(this.id) },
//         { $set: { cart: { items: updatedCartItems } } }
//       )
//       .then()
//       .catch((err) => console.log(err));
//   }

//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new ObjectId(this.id),
//             name: this.name,
//             email: this.email
//           }
//         };
//         return db.collection('orders').insertOne(order);
//       })
//
//       .catch((err) => console.log(err));
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection('orders')
//       .find({ 'user._id': new ObjectId(this.id) })
//       .toArray();
//   }

//   static findOne(userId) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new ObjectId(userId) })
//       .then()
//       .catch((err) => console.log(err));
//   }
// }

module.exports = mongoose.model('User', userSchema);
