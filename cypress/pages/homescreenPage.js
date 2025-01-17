class dashboardPage {
    selectorsList() {
        const selectors = {
            homescreenLogo: "[alt='Cypress Heroes Logo']",
            loginLogoutButton: "li > .undefined",
            loginForm: ".bg-white",
            likeButton: "[data-cy='like']",
            loginToActionAlert: "div.flex > div.flex-col > h5",
            body: "body",
            hireButton: "[data-cy='money']",


        }
        return selectors
    }

    goToHomeByLogo() {
        cy.get(this.selectorsList().homescreenLogo)
            .click()
            .should('be.visible')

    }

    openLoginForm() {
        cy.get(this.selectorsList().loginLogoutButton)
            .click()

        cy.get(this.selectorsList().loginForm)
            .should('be.visible')

    }

    interactWithLikeButton() {
        cy.get(this.selectorsList().likeButton)
            .eq(0)
            .click()

        cy.get(this.selectorsList().body).then(($body) => {
            if ($body.find(this.selectorsList().loginToActionAlert).length > 0) {
                cy.get(this.selectorsList().loginToActionAlert)
                    .should('be.visible')
                    .and('contain', 'You must log in to like.')
            } else {
                cy.get(this.selectorsList().likeButton)
                    .each(($button) => {
                        cy.wrap($button).click()
                    })

            }
        })

    }

    interactWithHireButton() {
        cy.get(this.selectorsList().hireButton)
            .eq(0)
            .click()

        cy.get(this.selectorsList().body).then(($body) => {
            if ($body.find(this.selectorsList().loginToActionAlert).length > 0) {
                cy.get(this.selectorsList().loginToActionAlert)
                    .should('be.visible')
                    .and('contain', 'You must log in to hire this hero.')
            } else {
                cy.get(this.selectorsList().hireButton)
                    .each(($button) => {
                        cy.wrap($button).click()
                    })

            }
        })

    }

    logoutAction(){
        cy.wait(1500)
        cy.get(this.selectorsList().loginLogoutButton).then($button => {
            if ($button.text().includes('Logout')) {
                cy.wrap($button).click()
                cy.get(this.selectorsList().loginLogoutButton).should('have.text', 'Login')
            } else {
                cy.log('Usuário não está logado')
            }
        })
    }
}
export default dashboardPage