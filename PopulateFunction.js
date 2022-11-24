const { result } = require('lodash');
const mongoose = require('mongoose');

const uri = 'mongodb+srv://tam1706:123@cluster0.gmo5wfp.mongodb.net/PopulateFunction?retryWrites=true&w=majority';

try {
   mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  console.log('Connected to mongoDB')
} catch (error) {
  console.log(error)
}

const Schema = mongoose.Schema;

const author = new Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String
}, {
  collection: 'Author',
  versionKey: false
});

const book = new Schema({
  name: String,
  author: [{
    type: String,
    ref: 'author'
  }]
}, {
  collection: 'Book',
  versionKey: false
});

const AuthorModel = mongoose.model('author', author);
const BookModel = mongoose.model('book', book);

function decribePopulateFunction(nameBook) {
  BookModel.findOne({ name: nameBook })
  .then(dataBook => {
    AuthorModel.find({ _id: { $in: dataBook.author }})
    .then(dataAuthor => {
      let result1 = {book: dataBook, author: dataAuthor}
      console.log(result1)
      return {book: dataBook, author: dataAuthor}
    })
    .catch(errAuthor => {
      return errAuthor;
    })
  })
  .catch(errBook => {
    return errBook;
  })
}

console.log(decribePopulateFunction('Dune')) 

