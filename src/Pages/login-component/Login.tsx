import * as React from 'react';
import { loginAction } from './actions/loginAction'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messaging } from '../../init-fcm';
import { version } from '../../config';
import { createBrowserHistory } from 'history';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import { scanPasswordlessLoginQRCodePage } from '../commonConst';
const { detect } = require('detect-browser');
const browser = detect();
let QRCode = require('qrcode.react');
const message: any = messaging;
const history = createBrowserHistory();

/* Interface for Props variables*/
export interface IScanQRProps {
  loginAction: any,
  LoginReducer: any,
  LoaderReducer: any,
}

/* Interface for local states variables*/
export interface IScanQRState {
  loginData: {
    username: string,
    password: string,
  },
  submitted: boolean,
  pushNotificationToken: any,
  fireBaseWarn: boolean,
  fireBaseWarnMessage: string,
  fireBaseWarnColor: string,
  socketId: string,
  proofRequestUrl: string
}

export default class ScanQR extends React.Component<IScanQRProps, IScanQRState> {
  constructor(props: IScanQRProps) {
    super(props);
    /* Initialization of state variables*/
    this.state = {
      loginData: {
        username: '',
        password: '',
      },
      pushNotificationToken: '',
      submitted: false,
      fireBaseWarn: false,
      fireBaseWarnMessage: '',
      fireBaseWarnColor: '',
      socketId: '',
      proofRequestUrl: ''
    }
  }

  async componentDidMount() {
    if (message !== undefined) {
      /* Method call to permission request for the firebase token. */
      message.requestPermission()
        .then(async () => {
          /* Method to get firebase token */
          message.getToken()
            .then(async (token: any) => {
              /* API call to get shortening URL for password-less login by passing the firebase token */
              await this.props.loginAction.getPresentProofRequest(token);
              this.setState({ pushNotificationToken: token });
              let proofRequestUrl = this.props.LoginReducer.presentProofRequest
              this.setState({ pushNotificationToken: token, proofRequestUrl });
            })
            .catch((error: any) => {
              throw error;
            })

          /* Method to handle the firebase notification event and throw the notification on browser 
             and based on data redirect the nest page */
          navigator.serviceWorker.addEventListener("message", (message) => {
            /* Condition to check the firebase message type. */
            if (message.data.firebaseMessaging.payload.data.type === "LOGIN") {
              const userRecord = JSON.parse(message.data.firebaseMessaging.payload.data.record);
              const loginPayload = userRecord.otherUserFields;
              const token = userRecord.accessToken;
              /* Method call to set current user in redux-store. */
              this.props.loginAction.setCurrentUser(loginPayload)
              /* Based on user role, agent spin-up status and on-barding status set the routes for next page. */
              if (loginPayload.role.id !== 1 && loginPayload.organization.agentSpinupStatus === 0 && loginPayload.organization.isOnBoarded === 1) {
                localStorage.setItem('token', token);
                history.push('/pending-state')
              } else if (loginPayload.role.id !== 1 && loginPayload.organization.agentSpinupStatus === 0 && loginPayload.organization.isOnBoarded === 0) {
                toastr.message(`Complete Your Registration Process`, `Please go to first time login`)
              } else if (loginPayload.organization.organizationRunningStatus !== 'Active') {
                toastr.error(`Login failed`, `${loginPayload.organization.orgName} access has been blocked. Kindly contact the Administrator`)
              } else {
                if (loginPayload.role.id === 1) {
                  localStorage.setItem('token', token);
                  history.push('/platformAdmin-dashboard')
                } else if (loginPayload.role.id === 2 || loginPayload.role.id === 6) {
                  if (loginPayload.organization.isOnBoarded === 2 && loginPayload.organization.agentSpinupStatus === 0 && loginPayload.organization.isDashboard === false) {
                    localStorage.setItem('token', token);
                    history.push('/create-wallet')
                  } else if (loginPayload.organization.agentSpinupStatus === 2 && loginPayload.organization.isDashboard === false) {
                    localStorage.setItem('token', token);
                    history.push('/create-wallet')
                  } else if (loginPayload.organization.agentSpinupStatus === 2 && loginPayload.organization.isDashboard === true) {
                    localStorage.setItem('token', token);
                    if (!_.isEmpty(loginPayload.organization.subscription) && loginPayload.organization.subscription.id === 1) {
                      history.push('/orgAdmin-dashboard')
                    } else if (!_.isEmpty(loginPayload.organization.subscription) && loginPayload.organization.subscription.id === 2) {
                      history.push('/orgAdmin-dashboard')
                    } else if (!_.isEmpty(loginPayload.organization.subscription) && loginPayload.organization.subscription.id === 3) {
                      history.push('/orgAdmin-dashboard')
                    }
                  } else if (loginPayload.organization.agentSpinupStatus === 0 && loginPayload.organization.isDashboard === false && loginPayload.organization.isOnBoarded === 3) {
                    localStorage.setItem('token', token);
                    history.push('/request-failed')
                  }
                } else if (loginPayload.role.id === 3 && loginPayload.isActive) {
                  localStorage.setItem('token', token);
                  history.push('/issuer-dashboard')
                } else if (loginPayload.role.id === 4 && loginPayload.isActive) {
                  localStorage.setItem('token', token);
                  history.push('/verifier-dashboard')
                } else if (loginPayload.role.id === 5 && loginPayload.isActive) {
                  localStorage.setItem('token', token);
                  history.push('/both-dashboard')
                } else {
                  toastr.info(`Currently, you are not activated for a login`, ``);
                }
              }
            }
          })
        })
        .catch(function (err: any) {
          console.error("Unable to get permission to notify.", err);
          toastr.info(`Please check your browser notification permission`, ``)
        });

    }
    else {
      /* Condition to check browser and based on show the firebase not support message */
      if (browser.name === "safari" && browser.os === "Mac OS") {
        this.setState({ fireBaseWarn: true, fireBaseWarnMessage: "This browser does not support notification", fireBaseWarnColor: 'danger' });
        setTimeout(() => { this.setState({ fireBaseWarn: false }); }, 3000);
        /* Toaster Message to inform the firebase notification support. */
        toastr.info(`${this.state.fireBaseWarnMessage}`, ``)
      }
    }
  }

  public render() {
    const { proofRequestUrl } = this.state;

    return (
      <>
        <div className="text-center">
          <h1 className="mb-5 nb-title-700">{scanPasswordlessLoginQRCodePage.WELCOME_MESSAGE}</h1>
          <div className="card shadow m-auto" style={{ width: '340px' }}>
            <div className="card-body">
              {proofRequestUrl == '' ?
                <>
                  <div className="content-loader justify-content-center h-100 pt-4">
                    <span className="mt-7 align-self-start">
                      <i className="fas fa-3x fa-circle-notch fa-spin"></i>
                    </span>
                    <p className='text-warning'>{scanPasswordlessLoginQRCodePage.QR_CODE_WAITING_MESSAGE}</p>
                  </div>
                </>
                :
                <QRCode value={proofRequestUrl} size={300} />
              }
            </div>
          </div>
          <div className="mt-3">
            <h4 className="text-blue">{scanPasswordlessLoginQRCodePage.SCAN_TO_LOGIN}</h4>
          </div>
          <div className="mt-3">
            <a className="nb-link" href='/login'>{scanPasswordlessLoginQRCodePage.BACK_TO_FIRST_TIME_LOGIN_PAGE_LINK}</a>
          </div>
          <div>
            <small className="text-muted">{scanPasswordlessLoginQRCodePage.APPLICATION_VERSION} {version.version}</small>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state: any) {
  const LoginReducer = state.LoginReducer;
  const LoaderReducer = state.LoaderReducer;
  return { LoginReducer, LoaderReducer }
}

function mapDispatchToProps(dispatch: any) {
  return {
    loginAction: bindActionCreators(loginAction, dispatch),
  }
}

const connectedScanQR = connect(mapStateToProps, mapDispatchToProps)(ScanQR);
export { connectedScanQR as ScanQR };
