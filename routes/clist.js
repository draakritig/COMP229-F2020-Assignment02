let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

// Helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

let listController = require('../controllers/clist')
/*GET Route for the contact list page- Read Operation*/
router.get('/', requireAuth, listController.displayContactList);

/*GET Route for displaying Update page- Update Operation*/
router.get('/update/:id', requireAuth, listController.displayUpdatePage);

/*POST Route for processing Update page- Update Operation*/
router.post('/update/:id', requireAuth, listController.processUpdatePage);

/*GET Route to perform Deletion- Delete Operation*/
router.get('/delete/:id', requireAuth, listController.performDelete);

module.exports = router;

