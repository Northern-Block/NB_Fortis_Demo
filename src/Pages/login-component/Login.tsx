import * as React from 'react';
import { loginAction } from './actions/loginAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { version } from '../../config';

import {useHistory} from "react-router-dom";
import fortis_logo from "../../assets/image/fortis-logo.png";
import code_scan from "../../assets/image/code-scan.png";
import veritx_logo from "../../assets/image/veritx_logo.png";
import "./login.scss";
import { toastr } from 'react-redux-toastr';
import { messaging } from '../../init-fcm';
const message: any = messaging;

/*Interface for props values */
export interface ILoginFormProps {
}

/*Interface for local state values */
export interface ILoginFormState {
  formData: any,
  errors: any,
  showTerms: boolean,
  acceptTerms: boolean,
  pushNotificationToken: string
}

export default class LoginForm extends React.Component<ILoginFormProps, ILoginFormState> {
  constructor(props: ILoginFormProps) {
    super(props);

    /* Initialization of local state variables. */
    this.state = {
      formData: {},
      errors: {},
      showTerms: false,
      acceptTerms: false,
      pushNotificationToken: ''
    }
    /* Bind all the methods. */
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.termsChange = this.termsChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.acceptTerms = this.acceptTerms.bind(this);
  }

  componentDidMount() {
    if (message !== undefined) {
      /* Method call to permission request for the firebase token. */
      message.requestPermission()
        .then(async () => {
          /* Method to get firebase token */
          message.getToken()
            .then(async (token: any) => {
              this.setState({ pushNotificationToken: token });
            })
            .catch((error: any) => {
              throw error;
            })
        })
        .catch(function (err: any) {
          console.error("Unable to get permission to notify.", err);
          toastr.info(`Please check your browser notification permission`, ``)
        });
    }
    /* Check local storage values and if it is present then call get current logged in user action method. */
    if (localStorage.length > 0) {
      {}; //this.props.loginAction.getCurrentUser();
    }
  }

  /**
   * Method used for getting the login form values and set it in state variable.
   * @param event 
   */
  handleChange(event: React.ChangeEvent<HTMLInputElement> | any) {
    let formData = this.state.formData;
    formData[event.target.name] = event.target.value;
    formData['firebaseToken'] = this.state.pushNotificationToken
    this.setState({
      formData: formData
    });
    /* Method call for validate the typed value in login form */
    this.validateForm();
  }

  /**
   * Method used to accept term and condition of platform.
   * @param event 
   */
  termsChange(event: React.ChangeEvent<HTMLInputElement> | any) {
    let fields = this.state.formData;
    fields["terms"] = event.currentTarget.value;
    this.setState({
      formData: fields,
      showTerms: true,
    });
  }

  /**
   * Method used for calling the login action
   * @param event 
   */
  login(event: React.ChangeEvent<HTMLInputElement> | any) {
    const { formData } = this.state;
  }

  /**
   * Method used to validate the form field  
   * @returns Validate the form field and return the error message or value
   */
  validateForm() {
    let formData: any = this.state.formData;
    let errors: any = {};
    let formIsValid: any = true;

    if (!formData["fullName"] && typeof formData["fullName"] !== "undefined") {
      formIsValid = false;
      errors["fullName"] = "*Please enter Full Name only.";
    }

    if (typeof formData["emailAddress"] !== "undefined") {
      //regular expression for emailAddress validation
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(formData["emailAddress"])) {
        formIsValid = false;
        errors["emailAddress"] = "*Please enter valid email-ID.";
      }
    }

    if (!formData["initialPassword"] && typeof formData["initialPassword"] !== "undefined") {
      formIsValid = false;
      errors["initialPassword"] = "*Please enter Initial Password only.";
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  /**
   * Method used for closing the terms and condition modal
   */
  closeModal() {
    this.setState({
      showTerms: false,
      acceptTerms: false,
    })
  }

  /**
   * Method used to accept terms and condition
   */
  acceptTerms() {
    this.setState({
      showTerms: false,
      acceptTerms: true,
    })
  }

  public render() {
    const userDetails = {}
    const switchToScanQR = {}
    const { formData, errors, acceptTerms } = this.state
		//const history = useHistory()

    /* Checking the different status of logged in user and based on that redirect to next page */
    if (!_.isEmpty(userDetails) && localStorage.length > 0) {
      if (userDetails.role.id !== 1 && userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isOnBoarded === 1) {
        // return (<>{history.push('/pending-state')}</>)
        return (<>history.push</>)
      } else if (userDetails.role.id !== 1 && userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isOnBoarded === 0) {
        toastr.message(`Complete Your Registration Process`, `Please go to first time login`)
      } else {
        if (userDetails.role.id === 1) {
          // return (<>{history.push('/platformAdmin-dashboard')}</>)
          return (<>history.push</>)
        } else if (userDetails.role.id === 2 || userDetails.role.id === 6) {
          if (userDetails.organization.isOnBoarded === 2 && userDetails.organization.agentSpinupStatus === 1 && userDetails.organization.isDashboard === false) {
            // return (<>{history.push('/create-wallet')}</>)
          	return (<>history.push</>)
          } else
            if (userDetails.organization.isOnBoarded === 2 && userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isDashboard === false) {
              // return (<>{history.push('/create-wallet')}</>)
          		return (<>history.push</>)
            } else if (userDetails.organization.agentSpinupStatus === 2 && userDetails.organization.isDashboard === false) {
              // return (<>{history.push('/create-wallet')}</>)
          		return (<>history.push</>)
              // history.push('/dashboard')
            } else if (userDetails.organization.agentSpinupStatus === 2 && userDetails.organization.isDashboard === true) {
              if (!_.isEmpty(userDetails.organization.subscription) && userDetails.organization.subscription.id === 1) {
                // return (<>{history.push('/orgAdmin-dashboard')}</>)
          			return (<>history.push</>)
              } else if (!_.isEmpty(userDetails.organization.subscription) && userDetails.organization.subscription.id === 2) {
                // return (<>{history.push('/orgAdmin-dashboard')}</>)
          			return (<>history.push</>)
              } else if (!_.isEmpty(userDetails.organization.subscription) && userDetails.organization.subscription.id === 3) {
                // return (<>{history.push('/orgAdmin-dashboard')}</>)
          			return (<>history.push</>)
              }
            } else if (userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isDashboard === false && userDetails.organization.isOnBoarded === 3) {
              // return (<>{history.push('/request-failed')}</>)
          		return (<>history.push</>)
            }
        } else if (userDetails.role.id === 3 && userDetails.isActive) {
          // return (<>{history.push('/issuer-dashboard')}</>)
          return (<>history.push</>)
        } else if (userDetails.role.id === 4 && userDetails.isActive) {
          // return (<>{history.push('/verifier-dashboard')}</>)
          return (<>history.push</>)
        } else if (userDetails.role.id === 5 && userDetails.isActive) {
          // return (<>{history.push('/both-dashboard')}</>)
          return (<>history.push</>)
        } else {
          toastr.info(`Currently, you are not activated for a login`, ``);
        }
      }
    } else {
      return (
        <div>
          <div className="text-center">
            <h1 className="mb-5 nb-title-700">Welcome to Northern Block Issuer &amp; Verifier Platform</h1>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label className="nb-label">FULL NAME<span>*</span> (Admin Name)</label>
                <input type="text" className="form-control" name="fullName" value={formData.fullName ? formData.fullName : ""}
                  onChange={(e) => this.handleChange(e)} />
                <div className="text-danger">{errors.fullName}</div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label className="nb-label">EMAIL ADDRESS<span>*</span></label>
                <input type="text" className="form-control" name="emailAddress" value={formData.emailAddress ? formData.emailAddress : ""}
                  onChange={(e) => this.handleChange(e)} />
                <div className="text-danger">{errors.emailAddress}</div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label className="nb-label">INITIAL PASSWORD<span>*</span></label>
                <input type="text" className="form-control" name="initialPassword" value={formData.initialPassword ? formData.initialPassword : ""}
                  onChange={(e) => this.handleChange(e)} />
                <div className="text-danger">{errors.initialPassword}</div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" name="terms" value={"terms"} checked={acceptTerms ? true : false}
                    onChange={(e) => this.termsChange(e)}
                  />
                  <label className="custom-control-label nb-label" htmlFor="customCheck1">I agree the Terms and Conditions.<span>*</span></label>
                </div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <button type="button" className="btn btn-nb-blue btn-lg btn-block"
                  disabled={!_.isEmpty(errors) || !formData.fullName || !formData.emailAddress || !formData.initialPassword || !acceptTerms}
                  onClick={(e) => this.login(e)}><i className="nb-ico nb-finger-print"></i> Sign In</button>
              </div>
            </div>
            <div className="col-sm-12">
            </div>
            <div className="col-sm-12">
              <small className="text-muted">Version {version.version}</small>
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state: any) {
  return {}
}

function mapDispatchToProps(dispatch: any) {
  return {
    loginAction: {},
  }
}

const connectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
export { connectedLoginForm as LoginForm };
