import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import HomescreenPage from '../pages/homescreenPage.js'
import CreateHeroPage from '../pages/createHeroPage.js'

const loginPage = new LoginPage()
const homescreenPage = new HomescreenPage()
const createHeroPage = new CreateHeroPage()

describe('Create a new hero with all complete informations', () => {
    it('Should create the hero without any issues', () => {
        loginPage.accessAppHome()
        loginPage.loginWithUser(
            userData.userSuccess.email,
            userData.userSuccess.password,
        )
        createHeroPage.createHeroCompleteInfo()

    })
})

describe.only('Create a new hero with all complete informations', () => {
    it('Should create the hero without any issues', () => {
        loginPage.accessAppHome()
        loginPage.loginWithUser(
            userData.userSuccess.email,
            userData.userSuccess.password,
        )
        createHeroPage.createHeroMissingInfo()

    })
})

