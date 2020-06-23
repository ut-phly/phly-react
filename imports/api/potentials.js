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

Thanks for signing up for Phly! My name is Lucious, and I am one of the creators of Phly. We built this platform to help people, just like you collect and manage payments for their clubs and communities. The link to the login is at the bottom of this email. However, for the best user experience, please read all of the contents of this message before you get started.

**Disclaimer**: While Phly is a safe, tested, and fully functioning platform that has helped groups successfully raise and manage over $75,000, we currently do payouts for your campaign manually.

Receiving your funds is quick and easy. Once your campaign is over, send us an email at hello@phly.co with details regarding how you would like to receive payment. Currently, we support PayPal, Venmo, Cash App, Check, and Bank Transfer. Once you send us this email and we confirm your payment details, you will receive the funds from your campaign in 3-5 business days (and maybe sooner!). If you’d like to send your funds directly to a nonprofit, we can mail a check on behalf of your group to avoid additional online processing fees. We are actively automating this process, but for the time being, this is the best way for us to serve you.



Phly is easy to use. You can start your first campaign now, but if you’d like a demo of the platform for you or your group, please use this link (https://calendly.com/lucious4/phly-demo) to schedule a time to meet with our team.

Finally, if you have any questions regarding the platform, please feel free to email us at hello@phly.co or give us a call at (832) 341-7603.

Thanks for your interest in Phly, and you can start your first campaign now by clicking here: https://phly.co/register

            `;
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
