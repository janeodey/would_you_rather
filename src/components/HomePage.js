import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const HomePage = (props)=> {
    const { users, authedUser } = props;
    const { name, avatarURL } = users[authedUser];
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <div className="item" />
          <NavLink
            to="/"
            exact
            className="header item"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink to="/add" exact className="item" activeClassName="active">
            New Question
          </NavLink>
          <NavLink
            to="/leaderboard"
            exact
            className="item"
            activeClassName="active"
          >
            Leader Board
          </NavLink>
          <div className="ui right floated item">
            <span style={{ marginRight: "10px" }}>Welcome, {name}</span>
            <img className="ui avatar image" src={avatarURL} alt="image Avatar" />
          </div>
          <NavLink to="/logout" exact className="item" activeClassName="active">
            Logout
          </NavLink>
        </div>
      </div>
    );

}

const mapStateToProps = state => {
  return { authedUser: state.authedUser, users: state.users };
};

export default connect(mapStateToProps)(HomePage);
