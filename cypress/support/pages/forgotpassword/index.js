import { el } from './elements'
import toast from '../../components/toast'

class ForgotPasswordPage {

    constructor(){
        this.toast = toast
    }

    go() {
        cy.visit('/forgot-password')
    }

    fillForm(user) {
        cy.get(el.email)
            .clear()
            .type(user.email)
    }

    submit() {
        cy.get(el.recoveryButton)
            .click()
    }
}

export default new ForgotPasswordPage()