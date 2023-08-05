import forgotPasswordPage from "../support/pages/forgotpassword"
import resetpass from "../support/pages/resetpass"

describe('resgate de senha', () => {
    let lisa 

    before(() => {
        cy.fixture('recovery')
            .then((recovery) =>{ lisa = recovery })
    })

    context('quando o usuário esquece a senha', () => {
        before(() => cy.postUser(lisa))

        it('deve poder resgatar por email', () => {
            forgotPasswordPage.go()
            forgotPasswordPage.fillForm(lisa)
            forgotPasswordPage.submit()

            forgotPasswordPage.toast.checkMsg('Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.')
        })
    })

    context('quando o usuário solicita o resgate', () => {
        before(() => {
            cy.postUser(lisa)
            cy.recoveryPass(lisa.email)
        })

        it('deve poder cadastrar uma nova senha', () => {            
            const token = Cypress.env('recoveryToken')

            resetpass.go(token)
            resetpass.form('abc123', 'abc123')
            resetpass.submit()

            const msg = 'Agora você já pode logar com a sua nova senha secreta.'

            resetpass.toast.checkMsg(msg)
        })
    })
})