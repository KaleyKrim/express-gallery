var express = require('express');
var app = express();
var fs = require('fs');



/* 

GET REQUEST to view list of gallery photos

*/
app.get('/items', function (req, res){
  if (err) {
    throw err;
  }

})





/*

GET /gallery/:id to see single photo
Each photo should include Delete link for itself
should include a edit 

*/





/*

GET new photo see new photo form
need
Author: text
Link: text img url
description: text area

*/



/*

POST to create a new gallery photo

*/

app.post('/items', function (req, res){
  if (err) {
    throw err;
  }
  
})

/*

GET gallery :id/edit  to see edit form gallery photo indenfified
by id param
fields author:
link:
description:

*/





/*

PUt gallery/:id updates single gallery photo identified
by id param

*/


/*

DELETE gallery/:id to delete single photo

*/ 
app.delete('/items', function (req, res){
  if (err) {
    throw err;
  }
  
})