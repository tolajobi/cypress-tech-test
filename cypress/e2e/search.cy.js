context('Search', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('verify search results', () => {
      cy.get('.ssrcss-payrv3-NavigationLink-SearchLink').click()
      cy.get('#searchInput').should('be.visible')
      cy.get('#searchInput').type("christmas")
      cy.get('#searchButton').click()
      cy.wait(3000)
      cy.contains('p', 'a service for christmas day.')
    })

    // it('negative scenario', () => {})
})
