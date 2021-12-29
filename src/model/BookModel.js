const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.ltrsv.mongodb.net/Library app?retryWrites=true&w=majority');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title : String,
    author: String,
    image: String,
    about: String
});

const bookdata = mongoose.model('bookdata',BookSchema);

module.exports = bookdata;