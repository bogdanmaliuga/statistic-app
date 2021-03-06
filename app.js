// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/bear');
var Project = require ('./app/models/project');
mongoose.connect('mongodb://admin:1234@ds129733.mlab.com:29733/cat_for_hour', {useMongoClient: true}); // connect to our database
mongoose.Promise = require('bluebird')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 5000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

router.route('/projects')
  .post(function(req,res) {
    var project = new Project();
    project.name=req.body.name;
    project.github_url=req.body.github_url;
    project.technologies=req.body.technologies;

    project.save(function (err) {
      if(err)
          res.sen(err);
      res.json({message:'Project Created'})
    });

  }).get(function (req,res) {
      Project.find(function(err,projects) {
        if(err)
          res.send(err)
        res.json(projects)
      })

  })
router.route('/projects/:project_id').get(function (req,res) {
  console.log(req.params.project_id)
    Project.findById(req.params.project_id,function (err,project) {
      if(err)
        res.send(err);
      console.log(project)
      res.json(project)
    })
}).put(function(req, res) {

    Bear.findById(req.params.project_id, function(err, bear) {

        if (err)
            res.send(err);

        bear.name = req.body.name; // update the bears info

        // save the bear
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({message: 'Bear updated!'});
        });

    });
}).delete(function(req, res) {
    Bear.remove({
        _id: req.params.bear_id
    }, function(err, bear) {
        if (err)
            res.send(err);

        res.json({message: 'Successfully deleted'});
    });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
