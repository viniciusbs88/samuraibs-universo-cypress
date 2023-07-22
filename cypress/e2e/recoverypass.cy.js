import forgotPasswordPage from "../support/pages/forgotpassword"


describe('resgate de senha', () => {
    let lisa = null

    before(() => {
        cy.fixture('recovery')
            .then((recovery) => lisa = recovery)
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
})