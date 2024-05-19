const app = require('./app')
const connectDB = require('./db');
const port = 3000;


connectDB().then(() => {
    app.listen(port, ()=>{
        console.log('listening on port'+port);
    })
});



