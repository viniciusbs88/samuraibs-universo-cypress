
import { el } from './elements'
import toast from '../../components/toast'

class SignupPage {
    constructor() {
        this.toast = toast
    }

    go() {
        cy.visit('/signup')
    }

    fillForm(user) {
        cy.get(el.name)
            .clear()
            .type(user.name)
        cy.get(el.email)
            .clear()
            .type(user.email)
        cy.get(el.password)
            .clear()
            .type(user.password)
    }

    submit() {
        cy.contains(el.signupButton).click()
    }

    checkAlertMsg(expectedMsg) {
        cy.contains(el.alertError, expectedMsg)
            .should('be.visible')
    }
}

export default new SignupPage()