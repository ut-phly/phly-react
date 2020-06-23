import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import {
  Modal,
  Pagination,
  PaginationItem,
  PaginationLink,
  Button,
  TabContent,
  TabPane
} from 'reactstrap';

class IntroModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      intro: {
        active: false,
        page: 1,
      }
    }
  }

  toggle = () => {
    this.setState({ intro: { page: 1, active: !this.state.intro.active} });
  }

  handleChangePage = (page) => {
    if (page > 4) this.toggle();
    else this.setState({ intro: { ...this.state.intro, page: page }});
  }

  render() {

    return (
      <Modal
        className="modal-dialog-centered"
        isOpen={this.state.intro.active}
        toggle={() => this.toggle()}
        size="lg"
      >
        <div className="modal-header">
          <h3 className="modal-title ml-3 mt-3" id="modal-title-notification">
            Getting Started with Phly
          </h3>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => this.toggle()}
          >
            <span aria-hidden={true} className="mr-3"><h3>×</h3></span>
          </button>
        </div>
        <div className="modal-body pb-3">
          <div className="text-center">
            <TabContent activeTab={"page" + this.state.intro.page}>
              <TabPane tabId="page1">
                <h2 className="display-3">Dashboard Analytics</h2>
                <img
                  alt="..."
                  className="img-fluid"
                  src="/images/custom/analytics.gif"
                />
              </TabPane>
              <TabPane tabId="page2">
                <h2 className="display-3">Navigation</h2>
                <img
                  alt="..."
                  className="img-fluid"
                  src="/images/custom/navigation.gif"
                />
              </TabPane>
              <TabPane tabId="page3">
                <h2 className="display-3">Your First Campaign</h2>
                <img
                  alt="..."
                  className="img-fluid"
                  src="/images/custom/first-campaign.gif"
                />
              </TabPane>
              <TabPane tabId="page4">
                <h2 className="display-3">Sharing</h2>
                <img
                  alt="..."
                  className="img-fluid"
                  src="/images/custom/share.gif"
                />
              </TabPane>
            </TabContent>
          </div>
          <Pagination
            className="pagination justify-content-center mt-3"
            listClassName="justify-content-center"
          >
            <PaginationItem className={classnames({active: this.state.intro.page === 1})}>
              <PaginationLink
                onClick={() => this.handleChangePage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={classnames({active: this.state.intro.page === 2})}>
              <PaginationLink
                onClick={() => this.handleChangePage(2)}
              >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={classnames({active: this.state.intro.page === 3})}>
              <PaginationLink
                onClick={() => this.handleChangePage(3)}
              >
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={classnames({active: this.state.intro.page === 4})}>
              <PaginationLink
                onClick={() => this.handleChangePage(4)}
              >
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="ml-3">
              <Button
                onClick={() => this.handleChangePage(this.state.intro.page + 1)}
              >
               { this.state.intro.page === 4 ? "Done" : "Next" }
              </Button>
            </PaginationItem>
          </Pagination>
        </div>
      </Modal>
    );
  }
}

export default IntroModal;
