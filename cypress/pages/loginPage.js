class loginPage {
    selectorsList() {
        const selectors = {
            loginFormButton: "li > .undefined",
            emailField: "[data-cy='email']",
            passwordField: "[data-cy='password']",
            signInButton: "[novalidate=''] .undefined",
            logoutButton: "nav > .flex > :nth-child(2) > .undefined",
            loginError: ".text-red-500",
            closeLoginForm: ".modal-container",
        }
        return selectors
    }

    accessAppHome() {
        cy.visit('/')
    }

    loginWithUser(email, password) {
        cy.get(this.selectorsList().loginFormButton).click()
        cy.get(this.selectorsList().emailField).type(email)
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().signInButton).click()
    }

    verifyLoginPage() {
        cy.get(this.selectorsList().logoutButton).should('be.visible')
            .and('contain', 'Logout')
    }

    verifyLoginInvalidCredentials() {
        cy.get(this.selectorsList().loginError).should('be.visible')
            .and('contain', 'Invalid email or password')
    }

    LoginMissingInfo(email, password) {
        cy.get(this.selectorsList().loginFormButton).click()
        cy.get(this.selectorsList().emailField).type(email)
        cy.get(this.selectorsList().signInButton).click()
        cy.get(this.selectorsList().loginError).should('be.visible')
            .and('contain', 'Password is required')
        cy.get(this.selectorsList().closeLoginForm).click({ force: true })
        cy.get(this.selectorsList().loginFormButton).click()
        cy.get(this.selectorsList().passwordField).type(password)
        cy.get(this.selectorsList().signInButton).click()
        cy.get(this.selectorsList().loginError).should('be.visible')
            .and('contain', 'Email is required')
    }

}

export default loginPage