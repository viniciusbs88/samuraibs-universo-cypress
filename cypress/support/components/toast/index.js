import { el } from './elements'

class Toast {
    checkMsg(msg) {
        cy.get(el.toast)
            .should('be.visible')
            .find(el.msg)
            .should('have.text', msg)
    }
}

export default new Toast()