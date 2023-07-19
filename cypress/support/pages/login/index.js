
import { el } from './elements'
import toaster from '../../components/toast'
import alertField from '../../components/alertField'

class LoginPage {
    constructor() {
        this.toaster = toaster
        this.alertField = alertField
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
}

export default new LoginPage()