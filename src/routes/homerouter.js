const express = require('express'); 
const homeRouter = express.Router();
//Part#2 Point6
function router(nav){
homeRouter.get('/',function(req,res){

    res.render('home',{
        nav        //Part#2 Point6
    });
    
})



return homeRouter;

}

module.exports = router;