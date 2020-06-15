import React, { Component } from 'react';
import { withHistory, Link, Redirect } from 'react-router-dom';

import {
    Responsive,
    Segment,
    Grid,
    Header
} from 'semantic-ui-react';

export default class Policies extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Responsive>
                <Segment style={{ backgroundColor: '#F9FFFF', paddingTop: '6em' }} vertical>
                    <Grid container stackable>
                        <Grid.Column width={8}>
                            <Header as='h1'
                                    color='orange'
                                    style={{
                                        fontSize: '2em',
                                        letterSpacing: '1.5px' }}>
                                Privacy Notice
                            </Header>
                            <p>This privacy notice discloses the privacy practices for <a href="https://www.phly.co/">www.phly.co/</a>. This privacy notice applies solely to information collected by this website. It will notify you of the following:</p>
                            <ol>
                            <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
                            <li>What choices are available to you regarding the use of your data.</li>
                            <li>The security procedures in place to protect from the misuse of your information.</li>
                            <li>How you can correct any inaccuracies in the information.</li>
                            </ol>
                            <p><strong>Information Collection, Use, and Sharing</strong></p>
                            <p><em>For Donors:</em></p>
                            <p>We only have access to/collect information that you voluntarily give us when you donate to a campaign through phly.co.</p>
                            <p>We may use your information to reach out to you about future opportunities to donate through phly.co. We will not share your information with any third party outside of our organization, other than to the non-profits you have chosen to donate to and as necessary to fulfill your donation.</p>
                            <p>Unless you ask us not to, we may contact you via email/text in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
                            <p><em>For Organization Members:</em></p>
                            <p>We only have access to/collect information that you voluntarily give us when you sign up at phly.co.</p>
                            <p>We may use your information to reach out to you about future opportunities to donate and utilize phly.co for your organizations. We will not share your information with any third party outside of our organization, other than to the non-profits you have chosen to donate to.</p>
                            <p>Unless you ask us not to, we may contact you via email/text in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
                            <p><em>For Organizations:</em></p>
                            <p>We only have access to/collect information that you voluntarily give us when you create an organization at phly.co.</p>
                            <p>We can display, advertise and share organization fundraising progress without personally identifiable information of individual organization members. Phly has full rights to republish and share all student organization content as well.</p>
                            <p>Unless you ask us not to, we may contact the organization via email/text about specials, new products or services, or changes to this privacy policy.</p>
                            <p><strong>Your Access to and Control Over Information</strong></p>
                            <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given at the bottom of this notice:</p>
                            <ul>
                            <li>See what data we have about you, if any.</li>
                            <li>Change/correct any data we have about you.</li>
                            <li>Have us delete any data we have about you.</li>
                            <li>Express any concern you have about our use of your data.</li>
                            </ul>
                            <p><strong>Security</strong></p>
                            <p>We take precautions to protect your information. When you submit sensitive information via phly.co, your information is protected both online and offline.</p>
                            <p>Wherever we collect sensitive information (such as credit card data and passwords), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the Web page.</p>
                            <p>While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment. We use Galaxy to host our website and read more about how they keep your data secure at <a href="https://galaxy-guide.meteor.com/security.html">https://galaxy-guide.meteor.com/security.html</a>.</p>
                            <p><strong>Donations</strong></p>
                            <p>We request information from you on our donation form. To donate through us, you must provide contact information and financial information (like credit card number, expiration date). This information is used for billing purposes. If we have trouble processing a donation, we'll use this information to contact you.</p>
                            <p><strong>Sharing</strong></p>
                            <p>For Donors:</p>
                            <p>We use an outside credit card processing company, Braintree, to bill users for donations. These companies do not retain, share, store or use personally identifiable information for any secondary purposes beyond fulfilling your donation. If you would like to know more about how Braintree keeps your payment data secure, please read more about Braintree data security at <a href="https://articles.braintreepayments.com/risk-and-security/overview">https://articles.braintreepayments.com/risk-and-security/overview</a>.</p>
                            <p>We partner with non-profits to provide them information about their donors so that they can develop a long-term relationship with donors passionate about their cause. When a donor donates to a non-profit, we will share their name and number with the non-profit so that they can reach out to the donor with updates and follow-ups on their donation.</p>
                            <p>For Organization Members:</p>
                            <p>We partner with non-profits to provide them information about their fundraising partners so that they can recognize student organizations and organization members conducting impressive fundraisers. When an organization member joins Phly, we may share their information (name, email, phone number, university, and organization) with the non-profits they are benefitting.&nbsp;</p>
                            <p><strong>If you feel that we are not abiding by this privacy policy, you should contact us immediately via email at </strong><strong>hello@phly.co</strong><strong>.</strong></p>
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Responsive>
        )
    }
}
