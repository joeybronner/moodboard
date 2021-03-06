'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var passport = require('passport');
var Sandbox = mongoose.model('Sandbox');
var User = mongoose.model('User');
var crypto = require('crypto');

exports.getusersdata = function(req, res) {
	// TODO: Here, first check if the username has a public moodboard.
	// If the moodboard is public, ok --> return data.
	// Else return 401 error.
	var username = req.params.username;
    Sandbox.findOne({'_username': username}, function(err, doc){
        if (err) {
            res.send(err);
        } else {
        	res.json(doc);
        }
	});
};

exports.getusersinfos = function(req, res) {
    if (req.user) {
        var username = req.params.username;
        User.findOne({'username': username}, function(err, doc){
            if (err) {
                res.send(err);
            } else {
                var user = {
                    username: doc.username,
                    email: doc.email,
                    firstName: doc.firstName,
                    lastName: doc.lastName,
                    created: doc.created
                }
                res.json(user);
            }
        });
    }
};

exports.putSettings = function(req, res) {
	if (req.user) {
		var username = req.params.username;
		var colorPalette = req.body.colorpalette;
		var privacy = req.body.privacy;
        var oldpassword = req.body.oldpassword;
        var newpassword = req.body.newpassword; 
        var confirmpassword = req.body.confirmpassword;
        var view = req.body.view;

        // Update password
        if (view === 'myinfos') {
            User.findOne({
                username: username
            }, function(err, user) {
                if (user.authenticate(oldpassword)) {
                    if (newpassword === confirmpassword) {
                        user.password = newpassword;
                        user.save(function(err) {
                            if (err) {
                                return res.send(400, {
                                    message: 'TODO: Error message.'
                                });
                            } else {
                                res.send(200, {
                                    message: 'Successfully updated'
                                });
                            }
                        });
                    } else {
                        return res.send(400, {
                            message: 'Confirmation password is not matching with your new password'
                        });
                    }
                } else {
                    return res.send(400, {
                        message: 'Your current password is not matching'
                    });
                }
            });
        }

        // Update colors & privacy settings
        Sandbox.findOne({'_username': username}, function(err, doc){
	        if (err) {
	            res.send(err);
	        } else {
	        	doc.apparences.colorpalette = colorPalette;
	        	doc.settings.privacy = privacy;
	        	doc.save();
                res.send(200, {
                    message: 'Successfully updated'
                });
	        }
		});
	} else {
	    res.send('401.Unauthorized');
	}
};
