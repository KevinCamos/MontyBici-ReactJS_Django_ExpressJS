/// <reference types="cypress" />


describe('MontyBici App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
    cy.get('#email').type("kevin@gmail.com")
    cy.get('#password').type("kevin")
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click()

  })

  it('Si tienes bici, comprueba que el monedero se actualiza',  () => {

    cy.wait(1500)
    cy.get('.css-qglc6a > .MuiGrid-root > :nth-child(2)').contains('Javi de Disseny')
    cy.get('.css-qglc6a > .MuiGrid-root > :nth-child(2)').then(stationName => {
      if (stationName.text().length > 0) {
        cy.log(stationName.text())
        cy.get(':nth-child(8) > .MuiGrid-root > .MuiTypography-root').then(moneyFirst=>{
          cy.log(moneyFirst.text())
          cy.get(':nth-child(8) > .MuiGrid-root > .MuiTypography-root').contains(moneyFirst.text())
          cy.wait(11000)
          const money= moneyFirst.text()
          cy.get(':nth-child(8) > .MuiGrid-root > .MuiTypography-root').contains(money).should('not.exist')
        })
      }
    })

  })

  it('Comprueba que el idioma cambia',  () => {

    cy.get('.css-1t6c9ts > :nth-child(2) > .nav-link').click()        
    cy.get('.MuiTypography-h4').contains("Aumenta tu monedero")
    cy.get('.css-t73u6j-MuiTypography-root').click()
    cy.get('.MuiTypography-h4').contains("bISaHbe'choHmoH")
    cy.get('.MuiToolbar-root > :nth-child(2)').click()
    cy.get('.MuiTypography-h4').contains("Increase your wallet")
  })



  it('Comprueba que el formulario valida el input de cantidad',  () => {
    cy.get('.css-1t6c9ts > :nth-child(2) > .nav-link').click()        
    cy.get(':nth-child(4) > .MuiButton-root').click()
    cy.get('.MuiPaper-root > .MuiBox-root > .MuiButton-root').click()
    cy.get('#moneyCard').type("string en lugar de un número")
    cy.get(':nth-child(4) > .MuiButton-root').click()
    cy.wait(1000).get(':nth-child(4) > .MuiButton-root').click()

  })
})
