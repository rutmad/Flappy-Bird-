const express = require('express');

const app = express();

app.use(express.static('public'));

// app.get("/", (res:any, req:any) => {
//   res.send()
// });

app.listen(3001, () => {
  console.log("running on port 3001");
  
});

