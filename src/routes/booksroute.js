const express = require('express'); 
const booksRouter = express.Router();
// const books = require('../data/books');
const bookdata = require('../model/BookModel');

//Part#2 Point6
function router(nav){
//router to render books page
booksRouter.get('/',function(req,res){

    bookdata.find() 
    .then(function (books) {

    res.render('books',{
        nav,   //Part#2 Point6
        books
    });

    })
});



//router to render addbook page
booksRouter.get('/addbook',function(req,res){
    res.render('addbook',{
        nav                 //Part#2 Point6
    });

});




//router to add book
booksRouter.post('/add', function (req, res) {

        var item={
            title:req.body.title,
            author:req.body.author,
            image:req.body.image,
            about:req.body.about
        }
        console.log(item)  ;
        const book = new bookdata(item);
        book.save();
        res.redirect('/books');

    });



//router for singlebook
booksRouter.get('/:id',function(req,res){
    const id = req.params.id;
    bookdata.findOne({ _id: id })
            .then(function (book) {
                res.render('book', {
                    nav,             //Part#2 Point6
                    book
                })

            })
    
});



//Part#2 Point9
//router to delete book
booksRouter.delete('/delete', function (req, res) {

    const id = req.body.id;  

    bookdata.findOneAndDelete({ _id: id })
        .then(function () {

            res.redirect('/books')

        })  
});



//router to edit book
booksRouter.post('/edit', function (req, res) {

    bookdata.findById(req.body.id, function(err, data){
        if (err) {
            throw err;
        }
        else {
            res.render('editbook', {
                nav,       //Part#2 Point6
                data})
        }
    })
});


//Part#2 Point9
//router to update book
booksRouter.put('/update', function (req, res) {

    bookdata.findByIdAndUpdate(req.body.id, { $set: req.body }, function (err, data) {
        if (err) {
            res.json({ status: "Failed" });
        }
        else if (data.n == 0) {
            res.json({ status: "No match Found" });
        }
        else {
            res.redirect("/books");
        }

    }) 
})


return booksRouter;
}



module.exports = router;