/* eslint-disable */

describe('Visit home , if products exists, check the links by clicking', () => {
    it('visit and check first product', () => {
        cy.visit('http://localhost:3000');
        cy.get('.products-wrapper').find('.product-container').first().click()
        cy.url().should('include','/product/');
    });

    it('visit and check last product', () => {
        cy.visit('http://localhost:3000');
        cy.get('.products-wrapper').find('.product-container').last().click()
        cy.url().should('include','/product/');
    });
});
