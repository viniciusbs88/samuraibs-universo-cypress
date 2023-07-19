
import { el } from './elements'
import toaster from '../../components/toast'

class LoginPage {
    constructor() {
        this.toaster = toaster
    }

    go() {
        cy.visit('/')
    }

    fillForm(user) {
        cy.get(el.email)
            .clear()
            .type(user.email)
        cy.get(el.password)
            .clear()
            .type(user.password)
    }

    submit() {
        cy.contains(el.loginButton)
            .click()
    }

    checkAlertMsg(msg) {
        cy.contains(el.alertError, msg)
            .should('be.visible')
    }
}

export default new LoginPage()