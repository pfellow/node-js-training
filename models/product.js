const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  imageUrl: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);

// const { getDb } = require('../utils/database');
// const { ObjectId } = require('mongodb');

// class Product {
//   constructor(title, price, description, imageUrl, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.description = description;
//     this.imageUrl = imageUrl;
//     this.id = id;
//     this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this.id) {
//       dbOp = db
//         .collection('products')
//         .updateOne({ _id: new ObjectId(this.id) }, { $set: this });
//     } else {
//       dbOp = db.collection('products').insertOne(this);
//     }
//     return dbOp.then().catch((err) => console.log(err));
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find()
//       .toArray()
//       .then((products) => products)
//       .catch((err) => console.log(err));
//   }

//   static fetchOne(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .find({ _id: new ObjectId(prodId) })
//       .next()
//       .then((product) => product)
//       .catch((err) => console.log(err));
//   }

//   static deleteOne(prodId) {
//     const db = getDb();
//     return db
//       .collection('products')
//       .deleteOne({ _id: new ObjectId(prodId) })
//       .then()
//       .catch((err) => console.log(err));
//   }
// }

// module.exports = Product;
