import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'

const loginPage = new LoginPage

describe('Login Success', () => {
  it('Should login with valid user information', () => {
    loginPage.accessAppHome()
    loginPage.loginWithUser(
      userData.userSuccess.email,
      userData.userSuccess.password,
    )
    loginPage.verifyLoginPage()
  })
})

describe('Login with Invalid Credentials', () => {
  it('Should appears an error message when try to login with invalid credential', () => {
    loginPage.accessAppHome()
    loginPage.loginWithUser(
      userData.userFail.email,
      userData.userFail.password,
    )
    loginPage.verifyLoginInvalidCredentials()
  })
})

describe('Login with missing information', () => {
  it('Should appears an error message when try to login with invalid credential', () => {
    loginPage.accessAppHome()
    loginPage.LoginMissingInfo(
      userData.userFail.email,
      userData.userFail.password,
    )
  })
})
