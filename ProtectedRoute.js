import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
  state = { canRedirect: false }

  componentDidMount() {
    let { canRedirect } = this.state;
    this.setState({ canRedirect: true });
  }

  render() {
    let { canRedirect } = this.state;
    let { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <div>
        { canRedirect ?
          <Route {...rest} render={props => (
            isAuthenticated ? (
              <Component {...props}/>
            ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
            )
          )}/> : null
        }
      </div> 
    )
  }
}

const mapStateToProps = (state) => {
  let isAuthenticated = Object.keys(state.user).length ? true : false
  return { isAuthenticated }
}

export default connect(mapStateToProps)(ProtectedRoute);
