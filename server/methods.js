import { Meteor } from 'meteor/meteor';
import '../imports/api/campaigns.js';

import SimpleSchema from 'simpl-schema';

// export const Campaigns = new Mongo.Collection('campaigns');
//
// Campaigns.schema = new SimpleSchema({
//   name: {type: String},
//   createdAt: {type: Date},
//   owner: {type: String},
//   username: {type: String},
// });
//
// //this will automatically check against the scehma when created
// Campaigns.attachSchema(Campaigns.schema);

Meteor.methods({


  'getClientToken'(clientId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
      options.clientId = clientId;
    }

    var response = generateToken(options);
    return response.clientToken;
  }
});
