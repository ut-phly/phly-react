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

        let text = `Howdy,

Thanks for signing up for Phly! My name is Lucious, and I am one of the creators of Phly. We built this platform to help people just like you collect and manage all of the incoming payments for your clubs and communities.

To get started now, follow this link: phly.co/register

Phly is easy to use. You can start your first campaign now, but if you’d like a demo of the platform for you or your group, please use this link (https://calendly.com/lucious4/phly-demo) to schedule a time to meet with our team.

Finally, if you have any questions regarding the platform, please feel free to email us at hello@phly.co or give us a call at (512) 522-2764.

Cheers,
The Phly Team`;
        let subject = "Welcome to Phly!";
        let from = "hello@phly.co";
        let to = user.email;

        Email.send({
            to: to,
            cc: "hello@phly.co",
            from: from,
            subject: subject,
            text: text });

        let receipt = `New potential user:

        Name: ${user.first} ${user.last}
        University: ${user.university}
        Organization: ${user.org}
        Email: ${user.email}

        `;
    }
})
