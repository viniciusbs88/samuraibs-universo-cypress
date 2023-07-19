
import { el } from './elements'

class Header {
    userLoggedIn(userName) {
        cy.get(el.fullName, { timeout: 7000 })
            .should('be.visible')
            .should('have.text', userName)
    }

    logout() {
        cy.get(el.logoutButton)
            .click()
    }
}

export default new Header()