import React from "react";
import PropTypes from 'prop-types';
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { updateAccountFormUpdate, updateAccount } from "../../actions/update-account";
import { connect } from "react-redux";

class UpdateAccountForm extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string,
    next: PropTypes.func,
    icon: PropTypes.string,
    inputProps: PropTypes.shape({
      email: PropTypes.object,
      password: PropTypes.object,
      passwordConfirmation: PropTypes.object,
      submit: PropTypes.object
    })
  };

  static defaultProps = {
    next: () => {},
    inputProps: {
      email: {},
      password: {},
      submit: {}
    }
  };

  getEndpoint () {
    return (
      this.props.endpoint ||
      this.props.auth.getIn(["configure", "currentEndpointKey"]) ||
      this.props.auth.getIn(["configure", "defaultEndpointKey"])
    );
  }

  handleInput (key, val) {
    this.props.dispatch(updateAccountFormUpdate(this.getEndpoint(), key, val));
  }

  handleSubmit (event) {
    console.log("submitting form to endpoint", this.getEndpoint());
    if (this.props.handleSubmit) {
      this.props.handleSubmit().then(this.props.next).catch(() => {})
      return
    }
    event.preventDefault();
    let formData = this.props.auth.getIn(["updateAccount", this.getEndpoint(), "form"]).toJS();
    this.props.dispatch(updateAccount(formData, this.getEndpoint()))
      .then(this.props.next)
      .catch(() => {});
  }

  render () {
    let disabled = (
      !this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["updateAccount", this.getEndpoint(), "loading"])
    );
    const { fields } = this.props;

    return (
      <form className='redux-auth update-account-form'
            style={{clear: "both", overflow: "hidden"}}
            onSubmit={this.handleSubmit.bind(this)}>
        <Input type="email"
               label="Email"
               className="update-account-email"
               disabled={disabled}
               value={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "form", "email"])}
               errors={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "errors", "email"])}
               onChange={this.handleInput.bind(this, "email")}
               {...this.props.inputProps.email} />

        {fields && fields.map((field, i) => (
          <Input key={i}
                 type={field.type || "text"}
                 label={field.label || field.key}
                 className={`update-account-${field.key}`}
                 disabled={disabled}
                 value={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "form", field.key])}
                 errors={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "errors", field.key])}
                 onChange={this.handleInput.bind(this, field.key)}
                 {...field.props} />
        ))}

        {this.props.children}

        <Input type="password"
               label="Current Password"
               className="update-account-current-password"
               disabled={disabled}
               value={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "form", "current_password"])}
               errors={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "errors", "current_password"])}
               onChange={this.handleInput.bind(this, "current_password")}
               {...this.props.inputProps.current_password} />

        <Input type="password"
               label="Password"
               className="update-account-password"
               disabled={disabled}
               value={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "form", "password"])}
               errors={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "errors", "password"])}
               onChange={this.handleInput.bind(this, "password")}
               {...this.props.inputProps.password} />

        <Input type="password"
               label="Password Confirmation"
               className="update-account-password-confirmation"
               disabled={disabled}
               value={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "form", "password_confirmation"])}
               errors={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "errors", "password_confirmation"])}
               onChange={this.handleInput.bind(this, "password_confirmation")}
               {...this.props.inputProps.passwordConfirmation} />

        <ButtonLoader loading={this.props.auth.getIn(["updateAccount", this.getEndpoint(), "loading"])}
                      type="submit"
                      className="update-account-submit"
                      primary={true}
                      style={{float: "right"}}
                      icon={this.props.icon}
                      disabled={disabled}
                      onClick={this.handleSubmit.bind(this)}
                      {...this.props.inputProps.submit}>
          {(this.props.inputProps.submit && this.props.inputProps.submit.title) || 'Sign Up'}
        </ButtonLoader>
      </form>
    );
  }
}

export default connect(({auth}) => ({auth}))(UpdateAccountForm);
