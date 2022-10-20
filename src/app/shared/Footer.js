import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between py-2 w-100">
          
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
              This site uses
              &nbsp;
              <a
                href="https://github.com/BootstrapDash/connect-plus-react-free-admin-template"
                target="_blank" 
                rel="noopener noreferrer">
                  Connect Plus React - Free Admin Template
              </a>.</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;