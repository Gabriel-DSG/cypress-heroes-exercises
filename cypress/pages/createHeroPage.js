class createHeroPage {
    selectorsList() {
        const selectors = {
            createNewHeroButton: "[href='/heroes/new']",
            heroCard: ".list-none",
            nameField: "[data-cy='nameInput']",
            priceField: "[data-cy='priceInput']",
            fansField: "[data-cy='fansInput']",
            savesField: "[data-cy='savesInput']",
            powerSelect: "[data-cy='powersSelect']",
            avatarField: "[data-cy='avatarFile']",
            submitButton: ".flex > .bg-blue-700",
            nameView: "[data-cy='name']",
            savesView: "[data-cy='saves']",
            fansView: "[data-cy='fans']",
            deleteFromEditButton: "[type='button']",
            missingInfoAlert: ".text-red-500",

        }
        return selectors
    }

    createHeroCompleteInfo() {
        cy.get(this.selectorsList().heroCard).then((cardsBeforeDelete) => {
            const initialCount = cardsBeforeDelete.length
            cy.get(this.selectorsList().createNewHeroButton).click()
            cy.get(this.selectorsList().nameField).type('AXL')
            cy.get(this.selectorsList().priceField).type('780')
            cy.get(this.selectorsList().fansField).type('65')
            cy.get(this.selectorsList().savesField).type('46')
            cy.get(this.selectorsList().powerSelect).select('2')
            cy.get(this.selectorsList().avatarField).selectFile('cypress/fixtures/image.png')
            cy.get(this.selectorsList().submitButton).click()
            cy.get(this.selectorsList().nameView).should('contain', 'AXL')
            cy.get(this.selectorsList().heroCard).should('have.length', initialCount + 1)
        })
    }

    createHeroMissingInfo() {
        cy.get(this.selectorsList().heroCard).then((cardsBeforeDelete) => {
            const initialCount = cardsBeforeDelete.length
            cy.get(this.selectorsList().createNewHeroButton).click()
            cy.get(this.selectorsList().priceField).type('780')
            cy.get(this.selectorsList().savesField).type('46')
            cy.get(this.selectorsList().powerSelect).select('2')
            cy.get(this.selectorsList().avatarField).selectFile('cypress/fixtures/image2.gif')
            cy.get(this.selectorsList().submitButton).click()
            cy.get(this.selectorsList().missingInfoAlert).eq(0)
                .should('contain', 'Name is required')
            cy.get(this.selectorsList().missingInfoAlert).eq(1)
                .should('contain', 'Fans is required')

        })
    }
}

export default createHeroPage