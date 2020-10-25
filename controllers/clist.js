let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to model
let List = require('../models/contacts');

module.exports.displayContactList = (req, res, next) => 
{
    List.find((err, contactList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
            res.render('./secure/business_contact', 
            {
                title: 'Business Contacts', 
                ContactList: contactList.sort((a,b) =>{
                    let nameSorting = [a.name, b.name].sort();
                    return nameSorting[0] == a.name ? -1 : 1;
                }),
                displayName: req.user ? req.user.displayName: ''
            });
        }
    });

}

module.exports.displayUpdatePage = (req, res, next) => 
{
    let id = req.params.id
    List.findById(id, (err, listUpdate) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // show the update view
            res.render('./secure/update',{title: 'Update List',conList: listUpdate,
            displayName: req.user ? req.user.displayName: ''});
        }
    });

}

module.exports.processUpdatePage = (req, res, next) => 
{
    let id = req.params.id
    let updatedList = List({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    List.updateOne({_id: id}, updatedList, (err) => {
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

}

module.exports.performDelete = (req, res, next) => 
{
    let id = req.params.id

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
}