var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');

//loading the list of videos
router.get('/', function(req, res) {
    var collection = db.get('videos');
    collection.find({}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

//saving(creating) a new video
router.post('/', function(req, res){
	console.log("saving new video");
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

//Getting an individual video
router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});

//Saving (updating) an individual video
router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

//Deleting) an individual video
router.delete('/:id', function(req, res){
	console.log("get's to delete endpoint?  Or not?");
    var collection = db.get('videos');
    collection.remove({
        _id: req.params.id
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

module.exports = router;