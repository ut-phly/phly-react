import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Email } from 'meteor/email';

export default Potentials = new Mongo.Collection('potentials');

Potentials.schema = new SimpleSchema({
    first: String,
    last: String,
    university: String,
    org: String,
    email: String,
});

Potentials.attachSchema(Potentials.schema);

Meteor.methods({
    'potentials.insert'(user) {
        console.log(user);
        Potentials.insert({
            first: user.first,
            last: user.last,
            university: user.university,
            org: user.org,
            email: user.email,
        });

        let text = `Hi ${user.first},

Thanks for your interest in using Phly to help your student organization fundraise! Our team is hard at work building a great product and we are excited to launch soon. By signing up, you will be the first to hear updates about Phly’s launch. If you have any questions about Phly, please reach out to us at hello@phly.co and we would love to talk with you.

Best Regards,

The Phly Team
            `;
        let subject = "Hi from Phly";
        let from = "hello@phly.co";
        let to = user.email;

        Email.send({
            to: to,
            from: from,
            submit: subject,
            text: text });

        subject = `New Potential: ${user.first} ${user.last}`;
        to = from;
        let receipt = `New potential user:

        Name: ${user.first} ${user.last}
        University: ${user.university}
        Organization: ${user.org}
        Email: ${user.email}

        `;

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: receipt });
    }
})
