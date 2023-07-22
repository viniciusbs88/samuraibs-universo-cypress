
import { faker } from '@faker-js/faker'
import signupPage from '../support/pages/signup'

describe('cadastro usuário', () => {
    let entries = {
        success : null,
        alreadyExists : null,
        invalidEmail : null,
        invalidPassword : null
    }

    before(() => {
        cy.fixture('signup')
            .then((signup) => {
                entries.success = signup.success
                entries.alreadyExists = signup.alreadyExists
                entries.invalidEmail = signup.invalidEmail
                entries.invalidPassword = signup.invalidPassword
            })
    })

    context('quando o usuário é novo', () => {
        before(() => {
            cy.task('removeUser', entries.success.email)
                .then((result) => {
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuário', () => {
            signupPage.go()
            signupPage.fillForm(entries.success)
            //    cy.intercept('POST', '/users', {
            //        statusCode : 200
            //    }).as('postUser')    
            signupPage.submit()
            //    cy.wait('@postUser')

            signupPage.toast.checkMsg('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o usuário já existe', () => {
        before(() => {
            cy.postUser(entries.alreadyExists)
        })

        it('deve impedir cadastro de usuário repetido', () => {
            signupPage.go()
            signupPage.fillForm(entries.alreadyExists)
            signupPage.submit()

            signupPage.toast.checkMsg('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', () => {
        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.fillForm(entries.invalidEmail)
            signupPage.submit()

            signupPage.alertField.checkMsg('Informe um email válido')
        })
    })

    context('quando a senha possui menos de 6 caracteres', () => {
        const passwords = ['1', '12', '123', '1234', '12345']

        before(() => {
            signupPage.go()
        })

        passwords.forEach(p => {
            it(`não deve cadastrar senha com ${p.length} caractere${p.length > 1 ? 's' : ''}`, () => {
                entries.invalidPassword.password = p

                signupPage.fillForm(entries.invalidPassword)
                signupPage.submit()
            })
        })

        afterEach(() => {
            signupPage.alertField.checkMsg('Pelo menos 6 caracteres')
        })
    })

    context('quando não preencho nenhum dos campos', () => {
        const msgs = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            signupPage.go()
            signupPage.submit()
        })

        msgs.forEach((alert) => {
            it(`deve exibir '${alert.toLowerCase()}'`, () => {
                signupPage.alertField.checkMsg(alert)
            })
        })
    })
})