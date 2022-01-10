describe('Search', () => {
  it('should allow searching for movies', () => {
    cy.visit('/')

    cy.get('[data-test-debounced-input]').type('The Matrix')

    // TODO: support query param search
    // cy.url().should('include', '/?search=The%20Matrix')

    cy.get('li:first').contains('The Matrix')
  })

  it('should show an error if searching for a movie that returns no results', () => {
    cy.visit('/')

    cy.get('[data-test-debounced-input]').type('notamovie')

    cy.get('[data-test-content-error]').contains('Movie not found!')
  })

  it('should load more results when scrolling down', () => {
    cy.visit('/')

    cy.get('[data-test-debounced-input]').type('The Matrix')

    cy.get('li:first').contains('The Matrix')

    cy.scrollTo(0, '100%')

    cy.get('li:nth-child(10)').contains('The Matrix Recalibrated')
  })
})

describe('Title Details', () => {
  it('should allow viewing title details', () => {
    cy.visit('/')

    cy.get('[data-test-debounced-input]').type('The Matrix')

    cy.get('li:first').click()

    cy.get('[data-test-movie-title]').should('include.text', 'The Matrix')

    cy.url().should('include', '/title')

    cy.title().should('include', 'The Matrix (1999)')
  })

  it('should allow going back to search from title details', () => {
    cy.visit('/')

    cy.get('[data-test-debounced-input]').type('The Matrix')

    cy.get('li:first').click()

    cy.get('[data-test-back-button]').click()

    cy.url().should('include', '/')

    cy.get('li:first').contains('The Matrix')
  })

  it('should allow going to the start view from title details if accessed directly', () => {
    cy.visit('/title/tt0133093')

    cy.get('[data-test-new-search-button]').click()

    cy.url().should('include', '/')
  })
})