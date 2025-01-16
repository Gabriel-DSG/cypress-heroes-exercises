class dashboardPage {
    selectorsList() {
        const selectors = {
            homescreenLogo: "[alt='Cypress Heroes Logo']",
            loginFormButton: "li > .undefined",
            loginForm: ".bg-white",
            likeButton: "[data-cy='like']",
            loginToLikeAlert: "div.flex > div.flex-col > h5",
            body: "body",


        }
        return selectors
    }

    goToHomeByLogo() {
        cy.get(this.selectorsList().homescreenLogo)
            .click()
            .should('be.visible')

    }

    openLoginForm() {
        cy.get(this.selectorsList().loginFormButton)
            .click()

        cy.get(this.selectorsList().loginForm)
            .should('be.visible')

    }

    interactWithLikeButton() {
        cy.get(this.selectorsList().likeButton)
            .eq(0)
            .click()

        cy.get(this.selectorsList().body).then(($body) => {
            if ($body.find(this.selectorsList().loginToLikeAlert).length > 0) {
                cy.get(this.selectorsList().loginToLikeAlert)
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
}
export default dashboardPage