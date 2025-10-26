describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(768, 1024);
  });

  it('main to 404 & signin', () => {
    cy.contains('[ntlstl.places]');
    cy.contains('mesto by ntlstl');
    cy.contains('Telegram');
    cy.contains('LinkedIn');
    cy.contains('Sign in');

    cy.visit('/404');
    cy.contains('404');
    cy.contains('Page not found');
    cy.contains('Home');

    cy.visit('/signin');
    cy.contains('Sign In');
  });
});
