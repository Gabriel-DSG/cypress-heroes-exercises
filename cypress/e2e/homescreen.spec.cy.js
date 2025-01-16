import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import HomescreenPage from '../pages/homescreenPage.js'

const loginPage = new LoginPage()
const homescreenPage = new HomescreenPage()

describe('Interact with app logo (logged out)', () => {
    it('Should reload the page properly', () => {
        loginPage.accessAppHome()
        homescreenPage.goToHomeByLogo()
    })
})

describe('Interact with login button (logged out)', () => {
    it('Should open the login form properly', () => {
        loginPage.accessAppHome()
        homescreenPage.openLoginForm()
    })
})

describe.only('Interact with like button (logged out)', () => {
    it('Should appears a message to login', () => {
        loginPage.accessAppHome()
        loginPage.loginWithUser(
            userData.userSuccess.email,
            userData.userSuccess.password,
          )
        homescreenPage.interactWithLikeButton()
    })
})

