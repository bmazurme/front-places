describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1800, 1200);
  });

  it('main to feed', () => {
    cy.get('[aria-label="Switch theme"]').click();
    cy.get('#root')
      .should('have.css', 'background-color')
      .and('eq', 'rgba(0, 0, 0, 0)');

    cy.getAllLocalStorage('ms-theme');
  });
});
