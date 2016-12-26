/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

var member = {"username": "nan", "password":"nan", "id":1};

    Member.create(member).exec( function(err, model) {});

  var property = {"estatetitle": "酒店式靚裝，有泳池會所", 
  "url":"http://orientaldaily.on.cc/cnt/finance/20111228/photo/1228-00204-028b1.jpg",
   "estate":"Festival City",
   "bedroom":"3",
   "tenants":"3",
   "area":"700 sq feet",
   "rent":"18000"
  // "id":1
};

    Property.create(property).exec( function(err, model) {});

    var property = {"estatetitle": "2房實用，交通方便", 
  "url":"http://static.apple.nextmedia.com/images/apple-photos/640pix/20030903/Article_fin/03bc351p.jpg",
   "estate":"Tin Ma Court",
   "bedroom":"2",
   "tenants":"2",
   "area":"400 sq feet",
   "rent":"13000"
   //"id":2
};

   Property.create(property).exec( function(err, model) {});

    var property = {"estatetitle": "沙田第一城 套3房剛翻新", 
  "url":"http://ps.hket.com/res/images/contents/2014/201411/20141121/479078/yyyy1118077_08_600x400_w.jpg",
   "estate":"City One",
   "bedroom":"3",
   "tenants":"2",
   "area":"600 sq feet",
   "rent":"18000"
   //"id":3
};

   Property.create(property).exec( function(err, model) {});

   var  property = {"estatetitle": "平絕同區", 
  "url":"http://www.angledesign.net/wp-content/uploads/2013/05/IMG_7041.jpg",
   "estate":"Festival City",
   "bedroom":"3",
   "tenants":"3",
   "area":"400 sq feet",
   "rent":"15000"
   //"id":4
};
   Property.create(property).exec( function(err, model) {});


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
 
};


 