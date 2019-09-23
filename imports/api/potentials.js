import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export default Potentials = new Mongo.Collection('potentials');

Potentials.schema = new SimpleSchema({
    name: String,
    university: String,
    org: String,
    email: String,
    phone: String
});

Potentials.attachSchema(Potentials.schema);

Meteor.methods({
    'potentials.insert'(user) {
        console.log(user);
        Potentials.insert({
            name: user.name,
            university: user.university,
            org: user.org,
            email: user.email,
            phone: user.phone
        });
    }
})
