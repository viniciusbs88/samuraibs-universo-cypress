
import { el } from './elements'

class AlertField{
    checkMsg(expectedMsg) {
        cy.contains(el.error, expectedMsg)
            .should('be.visible')
    }
}

export default new AlertField()