const express = require('express');
const app = express();

const port = 3002;

app.get('/', (req, res) => {
  //res.send('Hello, world!');
  res.send("<ul><li><p><a href='../upload'>Upload</a></p></li><li><p><a href='../upload'>Upload</a></p></li><li><p><a href='../upload'>Upload</a></p></li>,</ul>")
});

app.get('/login',(req,res)=>{
  require('./models/login')
});
app.get('/upload',(req,res)=>{
  require('./models/upload')
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
