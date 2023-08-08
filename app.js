const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // created instance of express 

const indexRouter = require('./routes/index'); // importing all route index file

const checkAuth = require('./Middleware/auth');

app.use(express.json());

// parse the req params and atteche them to req.body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Added middleware checkauth for all required request path bypass other path
app.use((req, res, next) => {
    const { path } = req;
    if (
        !path.includes("/api/user/create") &&
        !path.includes("/api/user/login")
    ) {
        checkAuth(req, res, next);
    } else {
        next();
    }
}); 

app.use("/api", indexRouter); // prefix for all the route endpoints

// port on which server will listen for incoming HTTP request
const port = 4000;

// created method to start HTTP request and bind on port
app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})

// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(400).json({
        message: "Url not found"
    })
});