/// <reference types="cypress" />

context('Jobs Search', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    // Existing and non-existing location
    // wait for results
    it('verify search results', () => {
      cy.get('#onetrust-accept-btn-handler').click()
      cy.get('.header_content__LmDsk > .button_base__KzM17').click()
      cy.get('h1').should('have.text', "find a care assistant job")
      cy.wait(3000);
      cy.get('.location-search-input').focus().type('Trafford', { force: true })
      cy.get('.locationSearchInput_dropdown__KG52s').within(() => {
          cy.contains('Manchester')
      })
    })

    // it('negative scenario', () => {})
})
