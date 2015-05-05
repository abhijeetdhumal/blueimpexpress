// config the uploader
var options = {
    tmpDir:  __dirname + '/../public/uploaded/tmp',
    publicDir: __dirname + '/../public/uploaded',
    uploadDir: __dirname + '/../public/uploaded/files',
    uploadUrl:  '/uploaded/files/',
    maxPostSize: 11000000000, // 11 GB
    minFileSize:  1,
    maxFileSize:  10000000000, // 10 GB
    acceptFileTypes:  /.+/i,
    // Files not matched by this regular expression force a download dialog,
    // to prevent executing any scripts in the context of the service domain:
    inlineFileTypes:  /\.(gif|jpe?g|png)$/i,
    imageTypes:  /\.(gif|jpe?g|png)$/i,
    imageVersions: {
        maxWidth:  80,
        maxHeight: 80
    },
    accessControl: {
        allowOrigin: '*',
        allowMethods: 'OPTIONS, HEAD, GET, POST, PUT, DELETE',
        allowHeaders: 'Content-Type, Content-Range, Content-Disposition'
    },
    storage : {
        type : 'local'
    },
    nodeStatic: {
        cache:  3600 // seconds to cache served files
    }    

};

 
var uploader = require('blueimp-file-upload-expressjs')(options);
var Images   = require('../database.js'); 
module.exports = function(router) {
  router.get('/upload', function(req, res) {
     uploader.get(req, res, function (err, obj) {
    	 Images.findAll({where : {id : '1'}}).then(function(imageList){
    		 
    		 file = imageList[0].file;
    		 console.log(file, "::::: ", JSON.stringify(file));
    		 res.send(JSON.parse(file));
    	 });
    });
  });
 
  router.post('/upload', function(req, res) {
	  uploader.post(req, res, function (err, obj) {
		    console.log("params",req.params);
		    console.log("resp", res);

		  console.log("Stringifying: ", JSON.stringify(obj));
		  console.log("req body", req.body);
		   console.log("pipe: ", req.data);

		  Images.create({
			  file : JSON.stringify(obj)
		  }).then(function(){});
		  
		  res.send(JSON.stringify(obj));
		  
    });
  });
 
  router.delete('/uploaded/files/:name', function(req, res) {
	 uploader.delete(req, res, function (obj) {
		 console.log(obj);
      res.send(JSON.stringify(obj));
    });
  });
  return router;
};