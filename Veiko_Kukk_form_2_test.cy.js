
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/
describe('Section 1: Functional tests', () => {
    it('User can use only same both first and validation passwords', () => {
        // Mandatory fields are filled
        cy.get('#username').type('Kukk')
        cy.get('#lastName').type('Kukk')
        cy.get('[name="name"]').type('Veiko')
        cy.get('#email').type('email@email.com')
        cy.get('[data-testid="phoneNumberTestId"]').type('55666777')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('Hippo')
        // Wrong password is inserted 
        cy.get('input[name="password"]').type('Parool123')
        cy.get('[name="confirm"]').type('Parool666')
        cy.get('h2').contains('Password').click()
        // The submit button is disabled, succes message not visible, password error message not visible
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')
        cy.get('#confirm').scrollIntoView()
        // Password field is cleared and correct password is entered
        cy.get('#confirm').clear()
        cy.get('#confirm').type('Parool123')
        cy.get('h2').contains('Password').click()
        //The submit button is enabled and error message is not visible
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('not.be.disabled')

    })

    it('User can submit form with all fields added', () => {
        // All mandatory fields are filled
        cy.get('#username').type('Kukk')
        cy.get('#lastName').type('Kukk')
        cy.get('[name="name"]').type('Veiko')
        cy.get('#email').type('email@email.com')
        cy.get('[data-testid="phoneNumberTestId"]').type('55666777')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('Hippo')
        cy.get('input[name="password"]').type('Parool123')
        cy.get('[name="confirm"]').type('Parool123')
        cy.get("h2").contains("Password").click()
        // Optional fields filled also
        cy.get("#javascriptFavLanguage").click()
        cy.get("#vehicle1").click()
        cy.get("#vehicle2").click()
        cy.get("#vehicle3").click()
        // The submit button is enabled
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        // The success message is displayed
        cy.get('#success_message').should('be.visible')
    })
    it('User can submit form with valid data and only mandatory fields added', () => {
        function inputValidData(username) {
            // All mandatory fields are filled
            cy.log('Username will be filled')
            cy.get('input[data-testid="user"]').type(username)
            cy.get('#email').type('validemail@yeap.com')
            cy.get('[data-cy="name"]').type('John')
            cy.get('#lastName').type('Doe')
            cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
            cy.get('#password').type('MyPass')
            cy.get('#confirm').type('MyPass')
            cy.get('h2').contains('Password').click()
            // Submit button is disabled and succes message is visible
            cy.get('.submit_button').should('be.enabled')
            cy.get('.submit_button').click()
            cy.get('#success_message').should('be.visible')
        }
    })
       // Add at least 1 test for checking some mandatory field's absence
    it('Test for abscent mandatory field', () => {
        cy.get('#username').type('Kukk')
        cy.get('#lastName').type('Kukk')
        // One mandatory field is abscent
        cy.get('#lastName').clear('Kukk')
        cy.get('[name="name"]').type('Veiko')
        cy.get('#email').type('email@email.com')
        cy.get('[data-testid="phoneNumberTestId"]').type('55666777')
        cy.get('#cars').select('Opel')
        cy.get('#animal').select('Hippo')
        cy.get('input[name="password"]').type('Parool123')
        cy.get('[name="confirm"]').type('Parool123')
        cy.get("h2").contains("Password").click()
        cy.get('.submit_button').should('be.disabled')
    })
})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height
        // it should be less than 178 and greater than 100
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })

    it('My test for second picture', () => {   
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 116)
            .and('be.greaterThan', 70)
    });
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })
    // TEST for the second link
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')

        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()

        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')

        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2') 
    })
    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

// Create test similar to previous one verifying check boxes
    it('Check that the list of checkboxes is correct', () => {
//Find checkbox element that has 3 options
        cy.get('input[type="checkbox"]').should('have.length', 3)
// Verify the checkbox option labels
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')
// Verify the default state 
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
// Both first and second option stay checked
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Check that the animal dropdown is correct', () => {
// Get animal dropdown element
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')
//Check animal all dropdown elements
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')
    })


})


