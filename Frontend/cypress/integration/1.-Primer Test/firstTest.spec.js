/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Nuestro primer test', () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit('/login')
    cy.get('#email').type("kevin@gmail.com")
    cy.get('#password').type("kevin")
    cy.get('.css-binzgt > .MuiBox-root > .MuiButton-root').click()
    cy.get('.MuiGrid-root > .MuiTypography-root').contains("kevin")
  })

  it('Comprobando empoints', () => {
    
    cy.wait(1500)

    cy.get('.MuiGrid-container > :nth-child(1)')    
    cy.get('.MuiGrid-container').find(' .MuiPaper-root').should('have.length', 8) 
    
    
  })

    
  after(() => {
    cy.get('.MuiAvatar-img').click()
    cy.get('[tabindex="-1"] > .nav-link > .MuiTypography-root').click()
    // runs once all tests are done
  })

})
