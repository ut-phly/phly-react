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
                                Terms of Use
                            </Header>
                            <ul>
                                <li><strong><strong>SCOPE OF AGREEMENT</strong></strong></li>
                            </ul>
                            <p>The following Terms of Use (&ldquo;Agreement&rdquo;) govern your use of websites located at phly.co By accessing the Sites, you agree to be bound by and comply with the terms and conditions of this Agreement. If, at any time, you choose not to accept the terms and conditions of this Agreement, do not access or use the Sites in any manner.</p>
                            <p>Please take a few minutes to read this Agreement carefully.</p>
                            <ul>
                            <li><strong><strong>INFORMATION AND PASSWORDS</strong></strong></li>
                            </ul>
                            <p>You may register and create a personal account to access certain features and functions of the Sites. You are solely responsible for maintaining the confidentiality of the user ID and password and are fully responsible for all activities that occur under your account. Phly does not retain liability or responsibility for such use.</p>
                            <ul>
                            <li><strong><strong>USER SUBMISSIONS</strong></strong></li>
                            </ul>
                            <p>User Content includes but is not limited to, any text, images, photos, audio, video, location data, ratings, reviews, compilations, messages or other information that is publicly displayed by you. Phly asks users who submit User Content to affirm that any information in the content is accurate, but Phly does not verify the accuracy of the information submitted by users.</p>
                            <p>By submitting User Content to any part of the Sites, you represent and warrant that:</p>
                            <ul>
                            <li><strong><em><strong><em>Any non-profit that you submit as a beneficiary to a campaign is a specific and verified 501c(3) non-profit</em></strong></em></strong></li>
                            </ul>
                            <ul>
                            <li>You are the sole author and owner of any intellectual property protected User Content you submit;</li>
                            <li>You are solely responsible for any contributions, comments or postings you submit, including any feedback or questions;</li>
                            <li>All User Content that you post is accurate;</li>
                            <li>Your use of the User Content does not violate this Agreement and will not cause injury to any person or entity;</li>
                            <li>You have not been offered, have not accepted, and are not entitled to receive any compensation in any form and from any party in connection with submitted User Content; and</li>
                            <li>You will indemnify, defend and hold harmless Phly, its officers, directors, employees, and agents from any third party claim(s) and any damages, losses or injuries resulting from the display of your User Content.</li>
                            </ul>
                            <p>You further agree and warrant that you will not:&nbsp;</p>
                            <ul>
                            <li>Submit any User Content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another&rsquo;s privacy, hateful or racially, ethnically or otherwise objectionable;</li>
                            <li>Submit any User Content that contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer software, hardware or telecommunications equipment;</li>
                            <li>Submit any User Content that infringes any patent, trademark, trade secret, copyright or other proprietary rights of any party;</li>
                            <li>Submit any User Content that is false or misleading;</li>
                            <li>Use the Sites for sales and marketing purposes;</li>
                            <li>Impersonate any person or entity or falsely state or otherwise misrepresent your affiliation with a person or entity;</li>
                            <li>Invade another&rsquo;s privacy in any way, including posting another&rsquo;s personal details without their prior permission;</li>
                            <li>Manipulate identifiers in order to disguise the origin of any User Content submitted;</li>
                            <li>Act in a manner that affects other users&rsquo; ability to engage in real-time exchanges;</li>
                            <li>Intentionally or unintentionally violate any applicable local, state, provincial, national or international law.</li>
                            </ul>
                            <p>You acknowledge that Phly and its affiliates have the right in their sole discretion, to remove, refuse, move, edit or delete any User Content submitted, regardless of whether such content violates this Agreement.&nbsp;</p>
                            <p>Any submission to the Sites will be deemed and remain the property of Phly. By submitting User Content to the Sites you hereby grant Phly and its affiliates a royalty-free, perpetual, irrevocable, worldwide license to use, reproduce, create derivative works from, modify, publish, edit, translate, distribute, perform and display the User Content in any media or medium, form, format or forum.</p>
                            <p>Phly shall not be subject to any obligations of confidentiality regarding User Content except as expressly agreed by Phly, or as otherwise required by applicable law. Nothing contained in this Agreement shall be construed as limiting Phly&rsquo;s rights, responsibilities, and obligations under its privacy policy located at <strong>the</strong><strong>link to the privacy policy</strong>.</p>
                            <ul>
                            <li><strong><strong>PHLY INTELLECTUAL PROPERTY</strong></strong></li>
                            </ul>
                            <p>Phly retains all right, title and interest, including all intellectual property rights, in and to the information and content on the Sites, including, without limitation, any text, graphics, logos, buttons, icons, images and audio clips (&ldquo;Phly Content&rdquo;). In addition, this Agreement grants you no right, title, or interest in any intellectual property owned or licensed by Phly, including Phly&rsquo;s registered trademarks, service marks, logos, brand names, trade dress and trade names (&ldquo;Trademarks&rdquo;).&nbsp;</p>
                            <p>You have no rights in or to such Phly Content or Trademarks and you will not use any Phly Content or Trademarks, except as specifically permitted under this Agreement. You may not do or allow anyone else to do anything with the Phly Content or Trademarks which is not specifically permitted under this Agreement. You may not use or display Phly&rsquo;s Trademarks in any manner without Phly&rsquo;s prior written consent. Unless we specifically consent in writing, Phly&rsquo;s Trademarks may not be used in connection with any product or service that does not belong to us, in any manner that is likely to cause confusion, or in any manner that disparages or discredits Phly.</p>
                            <p>Unless otherwise specifically set forth on the Sites or unless written consent is provided, you may only use and access, download and copy the Phly Content for your personal, non-commercial use, and you will not alter, erase or otherwise obscure our copyright, trademark, proprietary or other notices on the Phly Content. You acknowledge and agree that the Phly Content is made available for informational and educational purposes only, and is provided to assist you in exercising your own judgment. Phly Content is not a substitute for legal advice or your best judgment. The accuracy of Phly Content is not guaranteed, and Phly makes no representation or warranty of any kind. Unless otherwise specifically specified on the Sites, such as a Phly rating or alert, Phly Content should not be construed as a representation of the opinions of Phly. Phly does not give legal advice. Your reliance upon Phly Content obtained through the Sites is solely at your own risk. All rights not expressly granted in this Agreement are reserved to us.</p>
                            <ul>
                            <li><strong><strong>NOTIFICATION OF INFRINGING COPYRIGHT-PROTECTED CONTENT</strong></strong></li>
                            </ul>
                            <p>Material may be made available on the Sites by third parties not within our control. We are under no obligation to, and do not, scan material used in connection with the Sites for the inclusion of illegal or impermissible Content. However, we respect the copyright interests of others. It is our policy not to permit material known by us to infringe upon another party's copyright to remain on the Sites.</p>
                            <p>To notify Phly of alleged copyright or trademark infringement on the Sites, in accordance with 17 U.S.C. &sect;512(C)(3), you should provide us with written notice that at a minimum contains:</p>
                            <ul>
                            <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;</li>
                            <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works;</li>
                            <li>Identification of the copyrighted work that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit Phly to locate the material;</li>
                            <li>Information reasonably sufficient to permit Phly to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which the complaining party may be contacted;</li>
                            <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and</li>
                            <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                            </ul>
                            <p>All Notifications of Claimed Copyright Infringement should be sent to our designated agent at the email hello@phly.co</p>
                            <p>Upon receipt of the above information, Phly will promptly investigate and take appropriate action, then notify you of that action at the contact address provided.</p>
                            <ul>
                            <li><strong><strong>COMPLIANCE</strong></strong></li>
                            </ul>
                            <p>You expressly agree that the Sites may only be used for lawful purposes as governed by any applicable international, national/federal, state, provincial or local laws, statutes, and regulations. You may not use the Sites in any way that could result in criminal or civil liability. Use of the Sites from outside of the United States shall be in compliance with the laws of the jurisdiction from which you access the Sites.</p>
                            <ul>
                            <li><strong><strong>LINKS</strong></strong></li>
                            </ul>
                            <p>Inbound Links:</p>
                            <p>Third parties may link to our home page, publications, educational or consumer information, business profiles, and/ or to other website information so long as the link:</p>
                            <p>(a) is not in any way misleading;</p>
                            <p>(b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products, services or membership;</p>
                            <p>(c) appears without the use of any confusingly similar logo or border around the content;</p>
                            <p>(d) correctly uses the name &ldquo;Phly&rdquo;;</p>
                            <p>(e) uses the uniform resource locator ("URL") being linked to or any other description of the Phly website or material being linked to that makes sense within the context and format of content on the linking party&rsquo;s site; and</p>
                            <p>(f) does not reflect unfavorably on Phly(organizations representing inherently suspect types of businesses, such as work-at-home opportunities, are considered unfavorable and shall not be allowed to link).</p>
                            <p>Outbound Links:</p>
                            <p>Phly may link to non-profit or student organization websites or social medias.</p>
                            <p>Phly is not responsible for the content of any linked site, any link(s) contained in any linked site, or any changes or updates to the information contained in such sites. We provide links to third party sites only as a convenience and the inclusion of any such link on our site does not imply our endorsement of either the site, the organization operating such site, or any products or services of that organization. A visit to any site or page from our website via any such link is done entirely at your own risk.</p>
                            <p>We strongly recommend reading any Standard Terms and Conditions, Privacy Policy, Disclaimers or other notifications that may be found on any such third party websites. Under no circumstances will we be held responsible or liable, directly or indirectly, for any loss or damage that is caused or alleged to have been caused in connection with the use of, or reliance on, any content, goods or services available on any site not under the direct control of Phly.</p>
                            <ul>
                            <li><strong><strong>DISCLAIMER OF WARRANTY</strong></strong></li>
                            </ul>
                            <p>PHLY DOES NOT WARRANT OR GUARANTEE THE ACCURACY, ADEQUACY, TIMELINESS, RELIABILITY, COMPLETENESS, OR USEFULNESS OF THE SITES AND DISCLAIMS ANY LIABILITY FOR ERRORS OR OMISSIONS IN THE SITES. THE SITES ARE PROVIDED "AS-IS" WITHOUT ANY WARRANTY, EITHER EXPRESS OR IMPLIED. PHLY DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OF NON-INFRINGEMENT, TITLE, MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE, OR ANY WARRANTY THAT THE SITE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. THIS DOES NOT AFFECT THOSE WARRANTIES THAT ARE NOT SUBJECT TO EXCLUSION, RESTRICTION OR MODIFICATION UNDER THE LAWS APPLICABLE TO THIS AGREEMENT.</p>
                            <p>ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED THROUGH THE SITES IS ACQUIRED AT YOUR OWN DISCRETION AND RISK AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR OWN COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY SUCH MATERIAL.</p>
                            <ul>
                            <li><strong><strong>IDENTIFICATION</strong></strong></li>
                            </ul>
                            <p>You agree to indemnify and hold harmless Phly and its respective officers, directors, employees, agents, independent contractors or licensors (collectively the "Phly Parties") from and against any and all claims, losses, expenses, demands or liabilities, including attorneys' fees and costs, incurred by the Phly Parties in connection with any claim by a third party (including any intellectual property claim) arising out of (i) your use of the Sites and any material you access using the Sites or by any other means; (ii) a third party's use of such material that you access using the Sites and make available to such third party; or (iii) your violation of this Agreement or any applicable law. You further agree that you will cooperate fully in the defense of any such claims. Phly reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and you shall not in any event settle any such claim or matter without the written consent of the relevant Phly Parties.</p>
                            <ul>
                            <li><strong><strong>LIMITATION LIABILITY</strong></strong></li>
                            </ul>
                            <p>Under no circumstances shall Phly be liable to you or any other party for any direct, indirect, special, consequential or exemplary damages, including but not limited to, damages for lost profits, business interruption, goodwill or other intangible losses of any kind arising from or relating in any way to (i) your use of, or inability to use, the Sites or the information contained in the Sites; (ii) any failure of performance, error, omission, interruption, defect, delay in operation or transmission, computer virus or line or system failure; and (iii) any other matter relating to the Sites, even if advised of the possibility of such damages.</p>
                            <ul>
                            <li><strong><strong>TERMINATION</strong></strong></li>
                            </ul>
                            <p>Phly may immediately suspend access to the Sites and remove and discard any Content you submitted to the Sites for any reason if Phly believes you have participated in suspicious or illegal activity and/or violated or acted inconsistently with the terms of this Agreement. Termination of your access to the Sites may be effected without prior notice. Phly will not be liable to you or any third-party for termination of your access to the Sites.&nbsp;</p>
                            <ul>
                            <li><strong><strong>RELATIONSHIP</strong></strong></li>
                            </ul>
                            <p>Your use of the Sites does not create, and nothing contained in this Agreement will be deemed to establish, an employment, agency, franchise, joint venture or partnership relationship between you and Phly. Use of the Sites does not provide you with the authority to enter into any agreements for or on behalf of Phly. Moreover, the use of the Sites does not grant you the authority, either express or implied, to incur obligations or liability on behalf of Phly. By using the Sites, you agree that no attempts to subject Phly to any such obligations or liability will be made.&nbsp;</p>
                            <ul>
                            <li><strong><strong>WAIVER</strong></strong></li>
                            </ul>
                            <p>Failure by Phly to enforce any of its rights under this Agreement shall not be construed as a waiver of those rights or any other rights in any way whatsoever.</p>
                            <ul>
                            <li><strong><strong>CHOICE OF LAW AND DISPUTE RESOLUTION</strong></strong></li>
                            </ul>
                            <p>This Agreement and all other aspects of your use of the Sites shall be governed by and construed in accordance with the laws of the state of Texas, U.S.A., without regard to its conflict of laws rules. You agree that you will notify Phly in writing of any claim or dispute concerning or relating to your use of the Sites and give Phly a reasonable period of time to address it before bringing any legal action, either individually or as a class member against Phly. You agree to submit to the personal jurisdiction of the state and federal courts located in the City and County of Austin, Texas, U.S.A.</p>
                            <ul>
                            <li><strong><strong>OTHER AGREEMENTS</strong></strong></li>
                            </ul>
                            <p>This Agreement shall be subject to any other agreements you have entered into with Phly. If any such agreements conflict with the terms of the instant Agreement, the other agreements shall control.</p>
                            <ul>
                            <li><strong><strong>ADDITIONAL TERMS</strong></strong></li>
                            </ul>
                            <p>Please refer to our privacy policy for more information on how we collect, store, share and protect your data. The privacy policy can be found at the footer of the Phly website. For further information about donation refunds or cancellation, please refer to section 17, Cancellation and Refunds. For further information on the donation process, please refer to section 18, Donation Process. Should there be a conflict, the additional terms and conditions will govern for those sections or pages.</p>
                            <ul>
                            <li><strong><strong>CANCELLATIONS AND REFUNDS</strong></strong></li>
                            </ul>
                            <p><strong><em>All donations are final. So, please, double-check the amount and make sure you are happy with your donation. Although all donations are final, under extreme circumstances we will see if there&rsquo;s anything we can do. Please contact us at hello@phly.co.</em></strong></p>
                            <ul>
                            <li><strong><strong>DONATION PROCESS</strong></strong></li>
                            </ul>
                            <p><strong><em>By creating and publishing a fundraising campaign using Phly, the user agrees that Phly can collect donations on behalf of the organization. All money from a campaign will go directly to a non-profit minus the transaction fees. Phly does not collect any revenue through transaction fees. Additionally, Phly will not collect money for an unspecified and non-verified 501c(3) non-profit.</em></strong></p>
                            <ul>
                            <li><strong><strong>SEVERABILITY</strong></strong></li>
                            </ul>
                            <p>If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions shall be enforced to the fullest extent possible, and the remaining provisions of the Agreement shall remain in full force and effect.</p>
                            <ul>
                            <li><strong><strong>MODIFICATION</strong></strong></li>
                            </ul>
                            <p>The headings of Sections in this Agreement are provided for convenience only and will not affect its construction or interpretation.</p>
                            <ul>
                            <li><strong><strong>SECTION HEADINGS</strong></strong></li>
                            </ul>
                            <p>The headings of Sections in this Agreement are provided for convenience only and will not affect its construction or interpretation.</p>
                            <ul>
                            <li><strong><strong>EFFECT</strong></strong></li>
                            </ul>
                            <p>This Agreement will be binding on, inure to the benefit of, and be enforceable against the parties to this Agreement and their respective successors and assignees. Neither the course of conduct between the parties to this Agreement nor trade practice shall serve to modify any provision of this Agreement. All rights not expressly granted herein are hereby reserved.</p>

                        </Grid.Column>
                    </Grid>
                </Segment>
            </Responsive>
        )
    }
}
