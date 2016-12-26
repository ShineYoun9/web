/**
 * MemberController
 *
 * @description :: Server-side logic for managing Members
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


json: function(req, res) {
    Member.find().populateAll().exec( function(err, member) {
        return res.json(member);
    });
},

register: function(req, res) {
   
       if (req.method == "POST") {
       Member.create(req.body.Member).exec( function(err, model) {
            return res.send("Successfully Register!");
        });
    } else {
        return res.view('member/register',{'username':req.session.username});
    }
},

	login: function (req, res) {

               if (req.method == "GET")
            return res.view('member/login',{'username':req.session.username});
        else {

           Member.findOne({username:req.body.username})
            .exec( function (err,member) {

               if (member == null) 
                    return res.send("No such user");
                
                if (member.password != req.body.password) 
                    return res.send("Wrong Password");
        
                    req.session.username = req.body.username;
                      //return res.send(req.session.username);
                	//return res.view('property/index',{'username':req.session.username});
                   Property.find().exec( function(err, property) {
                    return res.view('property/index', {'property': property,'username':req.session.username});

                   // return res.json(req.session.username);
   });
                 
            });
        }
            
        },



dect: function(req, res) {
     Member.findOne({username:req.session.username}).populateAll().exec( function(err, member) {
         var h=member.dec;
         console.log(h);

         return res.json(h);
    });
   

},



    logout:function(req,res) {

          delete req.session.username ; 
           delete req.session.password ;
           return res.redirect("property/index");

        },
       addproperties: function (req, res) {
          
        Member.findOne({username:req.session.username}).exec( function (err, model) {
            if(model != null){
      model.dec.add(req.params.id);
      //model.save();
            model.save(function(err,model) {
              if (err) return res.send("Already added");
                else
            return res.send("Successfully Interested");
            });
          }
          else {
            return res.send("property not found");
          }
        });
   },

removeproperties: function (req, res) {

       Member.findOne({username:req.session.username}).exec( function (err, model) {

            
                model.dec.remove(req.params.id);
                model.save(function(err,model){

               if (err)  return res.send("property removed!");
           
                return res.redirect("member/myInProperties");
            });
        });
    
    },

    myInProperties: function(req, res) {
   Member.findOne({username:req.session.username}).populate("dec").exec(function(err,model){
    console.log(model.dec.length);
    var count = model.dec.length;
    var estatetitle = new Array(count);
    var area = new Array(count);
    var id = new Array(count);
    var estate = new Array(count);
    var rent = new Array(count);
    for(var m=0;m<count;m++)
    {
      estatetitle[m]=model.dec[m].estatetitle;
      area[m]=model.dec[m].area;
      id[m]=model.dec[m].id;
      estate[m]=model.dec[m].estate;
      rent[m]=model.dec[m].rent;
    }
    //return res.send("11");
    return res.view('member/myInProperties',{'estatetitle': estatetitle,'area': area,'id': id,'estate':estate,'rent':rent,'username':req.session.username,'count':count});
  // return res.json(property);
   });
},

};

