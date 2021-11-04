import React, { Component, Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";

import HomePage from "./HomePage";
import Footer from "./Footer";

import QuestionList from "./QuestionList";
import QuestionNew from "./QuestionNew";
import QuestionView from "./QuestionView";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import Logout from "./Logout";
import PageNotFound from "./PageNotFound";

class App extends Component {
  constructor(props){
    super(props);
    this.state = { activeIndex: 0 };
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange = (e, { activeIndex }) => {
    this.setState((prevState)=>activeIndex );
  };

  resetActiveIndexToZero = () => {
    this.setState(()=>{return{activeIndex: 0}});
  };

  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  render() {
    // const { authedUser } = this.props;

    if (!this.props.authedUser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Login} />
          </Switch>
        </BrowserRouter>
      );
    }

    return (
      <BrowserRouter>
        <>
          <LoadingBar style={{ zIndex: 1000 }} />
          <HomePage />
          <div style={{ marginTop: "5em" }}>
            <Switch>
              <Route
                path="/"
                exact
                render={() => {
                  return (
                    <QuestionList
                      handleTabChange={this.handleChange}
                      activeIndex={this.state.activeIndex}
                    />
                  );
                }}
              />
              <Route
                path="/add"
                render={history => {
                  return (
                    <QuestionNew
                      resetActiveIndexToZero={this.resetActiveIndexToZero}
                      history={history.history}
                    />
                  );
                }}
              />
              <Route path="/questions/:question_id" component={QuestionView} />
              <Route path="/leaderboard" component={LeaderBoard} />
              <Route path="/logout" component={Logout} />
              <Route path="/404" component={PageNotFound} />
              <Route path="/" component={PageNotFound} />
            </Switch>
          </div>
        
        </>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { authedUser } = state;
  return { authedUser };
};

export default connect(
  mapStateToProps,
  { handleInitialData }
)(App);
