
import { el } from './elements'

class LoginPage {

    go() {
        cy.visit('/')
    }

    fillForm(user) {
        cy.get(el.email).type(user.email)
        cy.get(el.password).type(user.password)
    }

    submit() {
        cy.contains(el.loginButton)
            .click()
    }
}

export default new LoginPage()