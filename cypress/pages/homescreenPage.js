class homescreenPage {
    selectorsList() {
        const selectors = {
            homescreenLogo: "[alt='Cypress Heroes Logo']",
            loginLogoutButton: "li > .undefined",
            loginForm: ".bg-white",
            likeButton: "[data-cy='like']",
            loginToActionAlert: ".flex > .flex-col > h5",
            body: "body",
            hireButton: "[data-cy='money']",
            noButtonHireModal: ".modal > .flex > .gap-2 > .border-gray-300",
            yesButtonHireModal: ".modal > .flex > .gap-2 > .bg-red-600",
            hireModal: ".modal",
            createNewHeroButton: "[href='/heroes/new']",
            editHeroButton: "[data-cy='pencil']",
            deleteHeroButton: "[data-cy='trash']",
            noButtonDeleteModal: ".modal > .flex > .gap-2 > .text-gray-800",
            yesButtonDeleteModal: ".modal > .flex > .gap-2 > .text-white",
            heroCard: ".list-none",
            nameField: "[data-cy='nameInput']",
            priceField: "[data-cy='priceInput']",
            fansField: "[data-cy='priceInput']",
            savesField: "[data-cy='savesInput']",
            powerSelect: "[data-cy='powersSelect']",
            avatarField: "[data-cy='avatarFile']",
            submitButton: ".flex > .bg-blue-700",
            nameView: "[data-cy='name']",
            savesView: "[data-cy='saves']",
            fansView: "[data-cy='fans']",
            deleteFromEditButton: "[type='button']",

        }
        return selectors
    }

    goToHomeByLogo() {
        cy.get(this.selectorsList().homescreenLogo).click()
            .should('be.visible')
    }

    openLoginForm() {
        cy.get(this.selectorsList().loginLogoutButton).click()
        cy.get(this.selectorsList().loginForm).should('be.visible')
    }

    interactWithLikeButton() {
        cy.get(this.selectorsList().likeButton).eq(0)
            .click()
        cy.get(this.selectorsList().body).then(($body) => {
            if ($body.find(this.selectorsList().loginToActionAlert).length > 0) {
                cy.get(this.selectorsList().loginToActionAlert).should('be.visible')
                    .and('contain', 'You must log in to like.')
            } else {
                cy.get(this.selectorsList().likeButton).each(($button, index) => {
                    cy.get(this.selectorsList().fansView).eq(index).invoke('text').then((initialFansText) => {
                        const initialFans = parseInt(initialFansText)
                        cy.wrap($button).click()
                        cy.wait(1000)
                        cy.get('[data-cy="fans"]').eq(index).invoke('text').then((updatedFansText) => {
                            const updatedFans = parseInt(updatedFansText)
                            expect(updatedFans).to.equal(initialFans + 1)
                        })
                    })
                })
            }
        })
    }

    interactWithHireButton() {
        cy.get(this.selectorsList().body).then(($body) => {
            if ($body.find(this.selectorsList().hireModal).length > 0) {
                cy.get(this.selectorsList().savesView).each(($field, index) => {
                    cy.wrap($field).invoke('text').then((initialSavesText) => {
                        const initialSaves = parseInt(initialSavesText)
                        cy.get(this.selectorsList().hireButton).eq(index)
                            .click({ force: true })
                        cy.get(this.selectorsList().noButtonHireModal).click({ force: true })
                        cy.get(this.selectorsList().hireButton).eq(index)
                            .click({ force: true })
                        cy.get(this.selectorsList().yesButtonHireModal).click({ force: true })
                        cy.wait(1000)
                        cy.wrap($field).invoke('text').then((updatedSavesText) => {
                            const updatedSaves = parseInt(updatedSavesText)
                            expect(updatedSaves).to.equal(initialSaves + 1)
                        })
                    })
                })
            } else {
                cy.get(this.selectorsList().hireButton).eq(0)
                    .click({ force: true })
                cy.get(this.selectorsList().loginToActionAlert).should('be.visible')
                    .and('contain', 'You must log in to hire this hero.')
            }
        })
    }

    logoutAction() {
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

    interactWithCreateNewHeroButton() {
        cy.get(this.selectorsList().createNewHeroButton).click()
        cy.get(this.selectorsList().powerSelect).should('be.visible')
    }

    interactWithEditButton() {
        cy.get(this.selectorsList().editHeroButton).eq(0)
            .click()
        cy.get(this.selectorsList().powerSelect).should('be.visible')
    }

    interactWhitDeleteButton() {
        cy.get(this.selectorsList().heroCard).then((cardsBeforeDelete) => {
            const initialCount = cardsBeforeDelete.length
            cy.get(this.selectorsList().deleteHeroButton).eq(0)
                .click()
            cy.get(this.selectorsList().noButtonDeleteModal).click()
            cy.get(this.selectorsList().deleteHeroButton).eq(0)
                .click()
            cy.get(this.selectorsList().yesButtonDeleteModal).click()
            cy.get(this.selectorsList().heroCard).should('have.length', initialCount - 1)
        })
    }

    interactWithEditScreen() {
        cy.get(this.selectorsList().heroCard).then((cardsBeforeDelete) => {
            const initialCount = cardsBeforeDelete.length
            cy.get(this.selectorsList().editHeroButton).eq(0)
                .click()
            cy.get(this.selectorsList().submitButton)
                .click()
            cy.get(this.selectorsList().heroCard)
                .should('have.length', initialCount)
            cy.get(this.selectorsList().editHeroButton).eq(0)
                .click()
            cy.get(this.selectorsList().nameField).clear()
                .type('Alex')
            cy.get(this.selectorsList().savesField).clear()
                .type('1000')
            cy.get(this.selectorsList().submitButton)
                .click()
            cy.wait(500)
            cy.get(this.selectorsList().nameView).eq(0)
                .should('contain', 'Alex')
            cy.get(this.selectorsList().savesView).eq(0)
                .should('contain', '1,000')
            cy.get(this.selectorsList().editHeroButton).eq(0)
                .click()
            cy.get(this.selectorsList().deleteFromEditButton).click()
            cy.get(this.selectorsList().noButtonDeleteModal).click()
            cy.get(this.selectorsList().deleteFromEditButton).click()
            cy.get(this.selectorsList().yesButtonDeleteModal).click()
            cy.get(this.selectorsList().homescreenLogo).click()
            cy.get(this.selectorsList().heroCard).should('have.length', initialCount - 1)
            cy.get(this.selectorsList().nameView).should('not.contain', 'Alex')

        })
    }
}
export default homescreenPage
