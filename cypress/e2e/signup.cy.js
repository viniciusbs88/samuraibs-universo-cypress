
import { faker } from '@faker-js/faker'
import signupPage from '../support/pages/signup'

describe('cadastro usuário', () => {
    context('quando o usuário é novo', () => {
        const user = {
            name: 'Vinícius',
            email: 'vini@test.com',
            //email : faker.internet.email(),
            password: 'pwd123'
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    console.log(result)
                })
        })

        it('deve cadastrar um novo usuário', () => {
            signupPage.go()
            signupPage.fillForm(user)
            //    cy.intercept('POST', '/users', {
            //        statusCode : 200
            //    }).as('postUser')    
            signupPage.submit()
            //    cy.wait('@postUser')

            signupPage.toast.checkMsg('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('quando o usuário já existe', () => {
        const user = {
            name: 'Zezin',
            email: 'zezin@test.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.task('removeUser', user.email)
                .then((result) => {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then((response) => {
                expect(response.status).to.eq(200)
            })
        })

        it('deve impedir cadastro de usuário repetido', () => {
            signupPage.go()
            signupPage.fillForm(user)
            signupPage.submit()

            signupPage.toast.checkMsg('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', () => {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', () => {
            signupPage.go()
            signupPage.fillForm(user)
            signupPage.submit()

            signupPage.alertHasMsg('Informe um email válido')
        })
    })

    context('quando a senha possui menos de 6 caracteres', () => {
        const passwords = ['1', '12', '123', '1234', '12345']

        beforeEach(() => {
            signupPage.go()
        })

        passwords.forEach(p => {
            it(`não deve cadastrar senha com ${p.length} caractere${p.length > 1 ? 's' : ''}`, () => {
                const user = {
                    name: 'Elizabeth Olsen',
                    email: 'liza@yahoo.com',
                    password: p
                }

                signupPage.fillForm(user)
                signupPage.submit()
            })
        })

        afterEach(() => {
            signupPage.alertHasMsg('Pelo menos 6 caracteres')
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
                signupPage.alertHasMsg(alert)
            })
        })
    })
})