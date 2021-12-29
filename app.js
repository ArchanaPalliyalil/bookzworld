const express = require('express'); 
const path = require ('path'); 
const methodOverride = require('method-override');  //Part#2 Point9
const bodyParser=require('body-parser');//#Part1 Point2
const cors = require('cors');

const nav= [
    {
        link:"/books",
        title:"Books"
    },
    {
        link:"/authors",
        title:"Authors"
    },
    {
        link:"/books/addbook",  //Part#2 Point6
        title:"Add Book"
    },
    {
        link:"/authors/addauthor", //Part#2 Point6
        title:"Add Author"
    }
]

const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const homeRouter = require('./src/routes/homerouter')(nav);   //Part#1 Point3   //Part#2 Point6
const booksRouter = require('./src/routes/booksroute')(nav);  //Part#2 Point6
const authorsRouter = require('./src/routes/authorsroute')(nav);  //Part#2 Point6
const app = new express(); //#Part1 Point1


app.set('views','./src/views'); 
app.set('view engine','ejs'); 

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname , '/public'))); 

app.use('/login',loginRouter); 
app.use('/signup',signupRouter); 
app.use('/home',homeRouter); 
app.use('/books',booksRouter); 
app.use('/authors',authorsRouter); 

app.use(cors({
    origin: '*'
})); //Part#2 Point7



app.get('/',function(req,res){

    res.render("index",{
        
    });
    
});





app.listen(process.env.PORT || 5000,()=>{
    console.log("Server Ready on 5000");  //Part#1 Point5
});