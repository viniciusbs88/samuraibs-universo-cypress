import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', () => {

    context('quando o usuário é muito bom', () => {

        const user = {
            name: 'Robson Jassa',
            email: 'jassa@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
        })

        it('deve logar com sucesso', () => {
            loginPage.go()
            loginPage.fillForm(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })

        after(() => {
            dashPage.header.logout()
        })
    })

    context('quando o usuário é bom mas a senha está incorreta', () => {
        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(() => {
            cy.postUser(user)
                .then(() => user.password = 'abc123')

        })

        it('deve notificar erro de credenciais', () => {
            loginPage.go()
            loginPage.fillForm(user)
            loginPage.submit()

            loginPage.toaster.checkMsg('Ocorreu um erro ao fazer login, verifique suas credenciais.')
        })
    })

    context('quando o formato do email é inválido', () => {
        const emails = [
            'papito.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            'papito@',
            '123',
            '&*^&^&*',
            'xpto123'
        ]

        before(() => {
            loginPage.go()
        })

        emails.forEach((email) => {
            it('não deve logar com o email: ' + email, () => {
                const user = {
                    email: email,
                    password: 'pwd123'
                }

                loginPage.fillForm(user)
                loginPage.submit()

                loginPage.alertField.checkMsg('Informe um email válido')
            })
        })

    })

    context('quando não preencho nenhum dos campos', () => {
        const msgs = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(() => {
            loginPage.go()
            loginPage.submit()
        })

        msgs.forEach((alert) => {
            it(`deve exibir '${alert.toLowerCase()}'`, () => {
                loginPage.alertField.checkMsg(alert)
            })
        })
    })
})