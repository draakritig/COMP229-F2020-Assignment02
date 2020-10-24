let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to contact model
let List = require('../models/contacts');

/*GET Route for the contact list page- Read Operation*/
router.get('/', (req, res, next) => {
    List.find((err, contactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
            res.render('./secure/business_contact', {title: 'Business Contacts', ContactList: contactList});
        }
    });

});


/*GET Route for displaying Edit page- Update Operation*/
router.get('/update/:id',(req, res, next) => {
    let id = req.params.id;
    List.findById(id,(err, listUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the edit view
            res.render('./secure/update',{title: 'Update List',conList: listUpdate});
        }
    });

});

/*POST Route for processing Edit page- Update Operation*/
router.post('/update/:id',(req, res, next) => {
    let id = req.params.id;
    let updateList = List({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    List.updateOne({_id: id}, updateList, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/business-list');
        }
    });

});

/*GET Route to perform Deletion- Delete Operation*/
router.get('/delete/:id',(req, res, next) => {
    let id = req.params.id;

    List.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        } 
        else
        {
             //refresh the contact list
             res.redirect('/business-list');
        }
    });
});
module.exports = router;

