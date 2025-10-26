describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
    cy.viewport(1800, 1200);
    const name = Cypress.env('COOKIE_NAME');
    const value = Cypress.env('COOKIE_VALUE');
    cy.setCookie(name, value);
  });

  it('profile', () => {
    cy.contains('[ntlstl.places]');
    cy.contains('mesto by ntlstl');
    cy.contains('Telegram');
    cy.contains('LinkedIn');
    cy.contains('Users');
    cy.contains('Sign Out');

    cy.visit('/users/');
    cy.contains('Users');

    cy.visit('/users/1');
    cy.contains('Cards');

    cy.visit('/404');
    cy.contains('404');
    cy.contains('Page not found');
    cy.contains('Home');

    cy.visit('/tags');
    cy.contains('Tags');
  });
});
