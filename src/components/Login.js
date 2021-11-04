import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown, Header, Message } from "semantic-ui-react";
import { setAuthedUser } from "../actions/authedUser";
import Footer from "./Footer"

class Login extends Component {
 constructor(){
   super();
   this. state = {
    selectedUser: null,
    message: { hidden: true, content: "" }
  };
 }
  referrer = null;

  componentDidMount() {
    const {
      history,
      location: { pathname }
    } = this.props;
    this.referrer = pathname;
    history.push("/login");
  }

  handleUserSelection = (event, data) => {
    this.setState(()=>{return{ selectedUser: data.value }});
  };

  handleUserLogin = () => {
    const { history } = this.props;
    if (!this.state.selectedUser) {
      this.setState({
        message: {
          hidden: false,
          content: "Wrong! Please select a user"
        }
      });
      return;
    } else {
      this.setState({
        message: {
          hidden: true,
          content: ""
        }
      });
    }

    this.props.setAuthedUser(this.state.selectedUser);
    (this.referrer === "/logout" || this.referrer === "/login") ? 
      history.push("/")
    : 
      history.push(this.referrer);
    
  };

  render() {
    // const { users } = this.props;
    if (!this.props.users) {
      return;
    }

    const userOptions = Object.keys(this.props.users).map(userId => ({
      key: userId,
      value: userId,
      text: this.props.users[userId].name,
      image: { avatar: true, src: this.props.users[userId].avatarURL }
    }));

    const { message } = this.state;

    return (
      <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="column" style={{ width: "420px", marginTop: "5em" }}>
            <Header as="h4" textAlign="center">
              <Header.Content>Welcome to the Would You Rather App!</Header.Content>
              <Header.Subheader>Please sign in to continue</Header.Subheader>
            </Header>
            <form className="ui large form">
              <div className="ui raised segment">
                <div className="field">
                  <Dropdown
                    placeholder="Select a User"
                    fluid
                    selection
                    options={userOptions}
                    onChange={this.handleUserSelection}
                  />
                </div>
                <Message hidden={message.hidden} negative>
                  {message.content}
                </Message>
                <div className="field">
                  Select a user from above and click the Signin button.
                </div>
                <div
                  className="ui fluid green submit button"
                  onClick={this.handleUserLogin}
                >
                  Signin
                </div>
              </div>
            </form>
          </div>
        </div>
          <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return { users };
};

export default connect(
  mapStateToProps,
  { setAuthedUser }
)(Login);
