

Meteor.methods({
    updateUsers: function(user_id, name, mail, phone) {
        var profileUser = { name: name, mail: mail, phone: phone };

        Meteor.users.update({ _id: user_id }, { $set: { profile: profileUser } });
        Roles.addUsersToRoles(user_id, 'administrator');
    },
    promoteAdmin: function(user_id) {
        Roles.addUsersToRoles(user_id, 'administrator');        
    },
    removeAdmin: function(user_id) {
        Roles.removeUsersFromRoles(user_id, 'administrator');        
    }
});

// 'PaperworkTypes.increment'(type) {
    
//             PaperworkTypes.update(
//                 { type: type },
//                 { $inc: { code: 1 } },
//             );
//         }