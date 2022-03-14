import { toastr } from "react-redux-toastr";
import { Dispatch } from 'redux'
import { loaderConst, userConstants, verification } from "../../types";
// import {useHistory} from "react-router-dom";
import axios from 'axios'
import { config } from "../../../config";
import _ from "lodash";
var jwt = require('jsonwebtoken')

export const loginAction = {

  /**
   * The common method to handle the responses.
   * @param responseData 
   * @param dispatch 
   * @returns Destructure the response and based on response status it returns the response or error message.
   */


  handleResponse(responseData: any, dispatch: Dispatch) {
    if (responseData) {
      const { status } = responseData
		  // const history = useHistory()
      if (status === 200 || status === 201) {
        return responseData.data;
      } else if (status === 404 || status === 400 || status === 422) {
        toastr.warning(`${responseData.data.message}`, `${responseData.data.error}`)
        return responseData.data.message;
      } else if (status === 500) {
        toastr.warning(`${responseData.data.message}`, `${responseData.data.error}`)
        return responseData.data.message;
      } else if (status === 401) {
        //token expiration
        const token = localStorage.getItem('token');
        let decoded = jwt.decode(token, { complete: true });
        let current_time = new Date().getTime();
        this.logout();
        if (decoded && decoded.payload && decoded.payload.exp && current_time > decoded.payload.exp) {
          return (toastr.warning('Session Has Been Expired....', ''));
        } else {
          toastr.error(`${responseData.data.error}`, `${responseData.data.message}`)
          return responseData.data;
        }
      }
      else {
        toastr.error(`${responseData.data.error}`, `${responseData.data.message}`)
        return responseData.data
      }
    }
    else {
      toastr.error('No API response.', 'Something bad happened; please try again later. ');
      this.logout();
      return 'Something bad happened; please try again later. ';
    }
  },

  /**
   * Method used to call sign-in for platform admin
   * @APIUrl /auth/signin
   * @param username Parameter accept platform admin email
   * @param password Parameter accept platform admin password
   * @param pushNotificationToken Parameter accept current running browser push notification token
   * @returns It return sign-in response which is sign-in success or not
   */
  loginAction(username: string, password: string, pushNotificationToken: any) {
    return async (dispatch: Dispatch) => {
      try {
        /* Dispatch method to start the page loader */
        dispatch({
          type: loaderConst.LOADER_TRUE
        })
        /* API call to sign-in and based on response and the status redirect to next page */
        return axios.post(`${config.apiUrl}/auth/signin`,
          {
            username,
            password,
            firebaseToken: pushNotificationToken,
          })
          .then(user => {
            dispatch({
              type: userConstants.LOGIN_SUCCESS,
              payload: user.data.data.userDetails
            })

            /* Set JWT auth token and username in local storage*/
            const token = user.data.data.accessToken;
            localStorage.setItem('token', token);
            const username = user.data.data.userDetails.username
            localStorage.setItem('username', username);
            const userDetails = user.data.data.userDetails;

            /* Check sign-in user details and based on its agent spin-up, onboard and subscription set redirecting url */
            if (userDetails.id !== 1 && userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isOnBoarded === 1) {
              // history.push('/pending-state')
            } else if (userDetails.id !== 1 && userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isOnBoarded === 0) {
              toastr.message(`Complete Your Registration Process`, `Please go to first time login`)
            } else {
              if (userDetails.role.id === 1) {
                // history.push('/platformAdmin-dashboard')
              } else if (userDetails.role.id === 2) {
                if (userDetails.organization.isDashboard === true) {
                  if (!_.isEmpty(userDetails.organization.subscription) && userDetails.organization.subscription.id === 1) {
                    // history.push('/orgAdmin-dashboard')
                  } else if (!_.isEmpty(userDetails.organization.subscription) && userDetails.organization.subscription.id === 2) {
                    // history.push('/orgAdmin-dashboard')
                  } else if (!_.isEmpty(userDetails.organization.subscription) && userDetails.organization.subscription.id === 3) {
                    // history.push('/orgAdmin-dashboard')
                  }
                }
                else if (userDetails.organization.isOnBoarded === 2 && userDetails.organization.agentSpinupStatus === 0) {
                  // history.push('/create-wallet')
                } else if (userDetails.organization.isOnBoarded === 2 && userDetails.organization.agentSpinupStatus === 1) {
                  // history.push('/create-wallet')
                } else if (userDetails.organization.agentSpinupStatus === 2 && userDetails.organization.isDashboard === false) {
                  // history.push('/create-wallet')
                } else if (userDetails.organization.agentSpinupStatus === 0 && userDetails.organization.isDashboard === false && userDetails.organization.isOnBoarded === 3) {
                  // history.push('/request-failed')
                }
              } else if (userDetails.role.id === 3 && userDetails.isActive) {
                // history.push('/issuer-dashboard')
              } else if (userDetails.role.id === 4 && userDetails.isActive) {
                // history.push('/verifier-dashboard')
              } else if (userDetails.role.id === 5 && userDetails.isActive) {
                // history.push('/both-dashboard')
              }
            }
            /* Dispatch method to stop the page loader */
            dispatch({
              type: loaderConst.LOADER_FALSE
            })
          })
          .catch(error => {
            toastr.error(`Check Login Credentials`, ``)
          })
      } catch (error) {
        /* Catch the error and throw it on frontend */
        throw error;
      }
    }
  },

  /**
   * Method used to store the logged-in user details in redux-store for next process.
   * @param loginPayload Parameter accept logged-in user details.
   * @param list 
   * @returns It return or dispatch the logged-in user details
   */
  setCurrentUser(loginPayload: any, list: any) {
    return async (dispatch: any, getState: any) => {
      dispatch({
        type: userConstants.LOGIN_SUCCESS,
        payload: loginPayload,
      })
    }
  },

  /**
   * Method used to get current logged-in user details by passing the user access token.
   * @APIUrl /common-api/get-user-details
   * @returns It return the specific user details
   */
  getCurrentUser() {
    return async (dispatch: Dispatch) => {
      try {
        /* Dispatch method to start the page loader */
        dispatch({
          type: loaderConst.LOADER_TRUE
        })
        /* Get authentication token from local storage */
        let token = localStorage.getItem('token');
        /* The API call for getting the current user details and dispatch the get logged-in user */
        return await axios.get(`${config.apiUrl}/common-api/get-user-details`,
          { headers: { "Authorization": `Bearer ${token}` } })
          .then(loggedUser => {
            return (
              dispatch({
                type: userConstants.GET_LOGGED_USER,
                payload: loggedUser.data.data
              }),
              /* Dispatch method to stop the page loader */
              dispatch({
                type: loaderConst.LOADER_FALSE
              })
            )
          })
          .catch(error => {
            /* Dispatch method to stop the page loader */
            dispatch({
              type: loaderConst.LOADER_FALSE
            })
            /* Handle the error and throw it */
            throw error;
          })
      } catch (error) {
        /* Dispatch method to stop the page loader */
        dispatch({
          type: loaderConst.LOADER_FALSE
        })
        /* Handle the error and throw it */
        throw error;
      }
    }
  },

  /**
   * Method for generating the present-proof for password-less login.
   * @APIUrl /verifier/present-proof/get-request.
   * @returns It return the generated present proof request.
   */
  getPresentProofRequest(fireBaseToken: string) {
    return async (dispatch: any) => {
      try {
        return await axios.get(`${config.apiUrl}/verifier/${fireBaseToken}`)
          .then(presentProofRequest => {
            dispatch({
              type: verification.GET_PRESENT_PROOF_REQUEST,
              payload: presentProofRequest
            })
          })
          .catch(error => {
            /* Handle the error and throw it */
            throw error;
          })
      } catch (error) {
        /* Handle the error and throw it */
        throw error;
      }
    }
  },

  /**
   * Method used to logout the current logged-in user and clear the local storage values.
   * @returns 
   */
  logout() {
    localStorage.clear();
    return { type: userConstants.LOGOUT };
  },

  /**
   * Method used to first time login process.
   * @APIUrl /auth/first-time-login
   * @param formData Parameter accept log-in details.
   * @param firebaseToken Parameter accept firebase token.
   * @returns Dispatch the login user details and based on its success details redirect to next page.
   */
  login(formData: any, firebaseToken: string) {
    return async (dispatch: any) => {
      try {
        /*API call to first time login and check the login success details and redirect to next page */
        return await axios.post(`${config.apiUrl}/auth/first-time-login`, formData)
          .then(loginResponse => {
            /* Check the different conditions for first time login and if its correct then redirect to register page */
            if (loginResponse && loginResponse.data && loginResponse.data.data && loginResponse.data.data.userDetails && loginResponse.data.data.userDetails.role.id !== 1 && loginResponse.data.data.userDetails.organization.agentSpinupStatus === 0 && loginResponse.data.data.userDetails.organization.isOnBoarded === 0 && !loginResponse.data.data.userDetails.isFirstLogin) {
              return (
                dispatch({
                  type: userConstants.SAVE_LOGIN_DATA,
                  payload: loginResponse
                }) //,
                /* Redirect to next page */
                // history.push('/register')
              )
              /* Check the different conditions for second time login and if its correct then redirect to create wallet page */
            } else if (loginResponse.data && loginResponse.data.data && !loginResponse.data.data.userDetails.isSecondLogin) {
              dispatch({
                type: userConstants.SAVE_LOGIN_DATA,
                payload: loginResponse
              })
              localStorage.setItem('token', loginResponse.data.data.accessToken)
              // history.push('/create-wallet')
            }
            else {
              /* Inform the response message after login successfully on UI */
              if (loginResponse.data && loginResponse.data.data && loginResponse.data.data.userDetails.isSecondLogin) {
                toastr.info(`Second Time login is Done`, `Please Wait for Approval`)
              } else {
                toastr.info(`First Time login is Done`, `Please Wait for Approval`)
              }
            }
          })
          .catch(error => {
            toastr.error(`${error.response.data.message}`, `${error.response.data.error}`)
            /* Handle the error and throw it */
            throw error;
          })
      } catch (error) {
        /* Handle the error and throw it */
        throw error;
      }
    }
  },
}
