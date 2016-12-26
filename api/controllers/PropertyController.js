/**
 * PropertyController
 *
 * @description :: Server-side logic for managing Properties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) {  

        Property.find().exec( function(err, property) {
    return res.view('property/index', {'property': property,'username':req.session.username});
   });
},



showIntMembers: function(req, res) {
  
    Property.findOne(req.params.id).populateAll().exec( function(err, model) {
       var count = model.interest.length;
        var username = new Array(count);
       for(var m=0;m<count;m++)
    {
      username[m]=model.interest[m].username;
    }
    return res.view('property/showIntMembers', {'properties': model.interest,'username':username,'count':count});
       
    });  
  
},



myProperties: function(req, res) {
   
         Property.find().exec( function(err, property) {
        return res.view('property/myProperties', {'property': property,'username':req.session.username});

    });
   
  
},

clearview: function(req, res) {
   //if (method="GET") 
    Property.findOne(req.params.id).exec( function(err, model) {
        //if (model != null)
    return res.view('property/clearview', {'model': model,'username':req.session.username});
        //else
          //  return res.send("No such property");
    });  
  
},

delete: function(req, res){
     Property.findOne(req.params.id).exec( function(err, model) {
        if (model != null) {
            model.destroy();
            return res.send("Property Deleted");
        } else {
            return res.send("property not found");
        }
    }); 
 },


admin: function(req, res) {
    return res.view('property/admin',{'username':req.session.username});
   
},

json: function(req, res) {
    Property.find().populateAll().exec( function(err, property) {
        return res.json(property);
    });
},


create: function(req, res) {
    if (req.method == "POST") {
       Property.create(req.body.Property).exec( function(err, model) {
            return res.send("Successfully Created!");
        });
    } else {
        return res.view('property/create',{'username':req.session.username});
    }
},

update: function(req, res) {
    if (req.method == "GET") {
        Property.findOne(req.params.id).exec( function(err, model) {
            if (model == null)
                return res.send("No such property!");
            else
                return res.view('property/update', {'model': model,'username':req.session.username});
        });
    } else {
        Property.findOne(req.params.id).exec( function(err, model) {
            model.title = req.body.Property.title ;
            model.url = req.body.Property.url ;
            model.estate = req.body.Property.estate ; 
            model.bedroom = req.body.Property.bedroom ;
            model.area = req.body.Property.area ; 
            model.tenants = req.body.Property.tenants ;
            model.rent = req.body.Property.rent ;
            model.save();
            return res.send("Record updated");
        }); 
    }
},


    logout:function(req,res) {

          delete req.session.username ; 
           delete req.session.password ;
           return res.redirect("property/index");

        },



    search:function(req,res){
      if(typeof(req.query.Property) == "undefined")
      {
        req.session.estate ="";
        req.session.bedroom = 0;
        req.session.area = 0;
        req.session.rent =500000;
        console.log(req.session.estate);
      }
      else
      {
        req.session.estate = req.query.Property.estate;
        req.session.bedroom = req.query.Property.bedroom;
        req.session.area = req.query.Property.area;
        req.session.rent = req.query.Property.rent;
      }
      var c = {estate:{contains:req.session.estate},
       bedroom:{contains:req.session.bedroom},
              area:{'>=':req.session.area},
              rent:{'<=':req.session.rent}
	  };
       Property.find(c).paginate({page:req.query.page,limit:2}).exec( function(err, property) {
        Property.count(c).exec(function(err,value){
          var pages = Math.ceil(value / 2);

    return res.view('property/search', {'property': property,'count':pages,'current':req.query.page,'username':req.session.username});
   });
       });
	},

paginate:function(req,res){
      Property.find().paginate({page:req.query.page,limit:2}).exec( function(err, property) {
          Property.count().exec(function(err, value) {
             var pages = Math.ceil(value / 2);

    return res.view('property/paginate', {'property': property,'count':pages,'current':req.query.page,'username':req.session.username});
     });
       });

},


admin: function(req, res) {
   Property.find().populateAll().exec(function(err,model){
   // console.log(model.dec.length);
    //var count = model.dec.length;
    //var title = new Array(count);
   // var area = new Array(count);
    //var id = new Array(count);
    //var estate = new Array(count);
   // var rent = new Array(count);
   // for(var m=0;m<count;m++)
  //  {
    //  title[m]=model.dec[m].title;
   //   area[m]=model.dec[m].area;
   //   id[m]=model.dec[m].id;
   //   estate[m]=model.dec[m].estate;
   //   rent[m]=model.dec[m].rent;
   // }
    //return res.send("11");
    return res.view('property/admin',{'property':model,'username':req.session.username});
  // return res.json(property);
   });
},
 
};

