import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/scripts/hash-calculator', state: 'scriptsHashCalculator'},

      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-category">Main</li>
          <li className={ this.isPathActive('/homepage') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/homepage">
              <span className="icon-bg"><i className="mdi mdi-cube menu-icon"></i></span>
              <span className="menu-title">Homepage</span>
            </Link>
          </li>

          <li className="nav-item nav-category">Scripts</li>
          <li className={ this.isPathActive('/scripts/hash-calculator') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/scripts/hash-calculator">
              <span className="icon-bg"><i className="mdi mdi-calculator menu-icon"></i></span>
              <span className="menu-title">Hash calculator</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/scripts/password-generator') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/scripts/password-generator">
              <span className="icon-bg"><i className="mdi mdi-key-variant menu-icon"></i></span>
              <span className="menu-title">Password generator</span>
            </Link>
          </li>
          <li className={ this.isPathActive('/scripts/unix-timestamp-converter') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/scripts/unix-timestamp-converter">
              <span className="icon-bg"><i className="mdi mdi-timer menu-icon"></i></span>
              <span className="menu-title">Unix timestamp</span>
            </Link>
          </li>

        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);