import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Promise } from 'meteor/promise';
import { Email } from 'meteor/email';

import SimpleSchema from 'simpl-schema';

export const Organizations = new Mongo.Collection('organizations');

if (Meteor.isServer) {
    Meteor.publish('myOrganizations', function orgPublication() {
        const user = Meteor.userId();
        return Organizations.find({
            $or: [
                { owner: user },
                { users: user }
            ]
        });
    });

    Meteor.publish('organizations', function orgPublication() {
      return Organizations.find({},
        {
          fields: {
            owner: 0,
            users: 0,
            share: 0,
            campaigns: 0
          }
        }
      );
    });
}

Organizations.schema = new SimpleSchema({
    name: String,
    createdAt: Date,
    owner: String,
    users: Array,
    share: String,
    'users.$': String,
    campaigns: Array,
    'campaigns.$': String,
});

Organizations.attachSchema(Organizations.schema);

Meteor.methods({
    'organizations.insert'(org) {
        let share = new Meteor.Collection.ObjectID();

        Organizations.insert({
            name: org.name,
            createdAt: new Date(),
            owner: org.owner,
            share: share._str,
            users: [],
            campaigns: []
        }, function(err, org_id) {
          if (err) {
            console.log(err);
          } else {
            Meteor.users.update(org.owner, { $set: { org: org_id } });
          }
        });
    },

    'organizations.delete'(id) {
        Organizations.update({ _id: id }, { $pull: { users: user }});
    },

    'organizations.join'(code, user) {
      let org = Organizations.findOne({ share: code });
      if (org) {
        Organizations.update({ share: code }, { $push: { users: user }});
        Meteor.users.update(user, { $set: { org: org._id } });
      } else throw new Meteor.Error('join-error', "Join code is invalid");
    },

    'organizations.invite'(org, email) {
      let user = Meteor.user();
      let username = "Phly";
      if (user) {
        if (user.profile) username = user.profile.first + " " + user.profile.last;
        else username = user.username;
      }

      let text = `Howdy,


Phly.co helps clubs and communities safely collect and manage payments with ease. To join the ${org.name} online dashboard:
  1. Create your own personal Phly account at www.phly.co/register
  2. Select “Join”
  3. Enter your custom join code: ${org.share}
  4. All done! Welcome to Phly!


Need help? Contact our customer support team by emailing us at support@phly.co or give us a call at 512-522-2764`;

      let subject = `${username} has invited you to join ${org.name} on Phly.co`;
      let to = email;
      let from = "hello@phly.co";

      Email.send({
        to: to,
        from: from,
        subject: subject,
        text: text
      });
    },

    'organizations.addCampaign'(id, campaign) {
        Organizations.update({ _id: id }, { $push: { campaigns: campaign }});
    },

    'organizations.save'(id, user) {
        console.log("saving user: " + user + ", " + id);
        Meteor.users.update(user, { $set: { org: id } });
    }
})
