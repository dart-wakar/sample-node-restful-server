const express = require('express')
const app = express()
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3003;
var router = express.Router();

mongoose.connect('mongodb://localhost/firstDb');
var User = require('./models/user');
router.use(function(req,res,next) {
    console.log('Something is happening');
    next();
});

router.route('/users')
    .post(function(req,res) {
        console.log('gg');
        var user = new User();
        user.name = req.body.name;
        user.age = req.body.age;
        user.room = req.body.room;

        user.save(function(err) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'User created'});
        })
    })

    .get(function(req,res) {
        User.find(function(err,users) {
            if(err) {
                res.send(err);
            }
            res.json(users);
        });
    });

router.route('/users/:user_id')
    .get(function(req,res) {
        console.log(req.params.user_id);
        User.findById(req.params.user_id,function(err,user) {
            if(err) {
                res.send(err);
            }
            res.json(user);
        });
    })

    .put(function(req,res) {
        User.findById(req.params.user_id,function(err,user) {
            if(err) {
                res.send(err);
            }
            user.name = req.body.name;
            user.age = req.body.age;
            user.room = req.body.room;
            user.sex = req.body.sex;

            user.save(function(err) {
                if(err) {
                    res.send(err);
                }
                res.json({message: 'User updated'});
            });
        });
    })

    .delete(function(req,res) {
        User.remove({
            _id: req.params.user_id
        },function(err,user) {
            if(err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted'});
        });
    })

router.get('/',function(req,res) {
    res.json({message: 'Welcome to our api'});
});


app.use('/api',router);
app.listen(port);
console.log('Server running on port '+port);

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log("We are connected");
    /*var userSchema = mongoose.Schema({
        name:String,
        age:Number,
        room:Number
    });
    var User = mongoose.model('User',userSchema);
    var user = new User({name:'amber',age: 21});
    console.log(user.name);
    user.save(function(err,user) {
        if (err) return console.error(err+'hahaha');
        console.log(user.name);
    })*/
    User.find(function(err,users) {
        if (err) return console.error(err+'hahahahaha');
        console.log(users);
    })
});
