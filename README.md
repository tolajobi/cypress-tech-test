# Cypress Web - Technical Testing Task

## Task 1
We are going to push changes to the search infrastructure, the functionality should stay the same. In order to ensure we have delivered quality, reliable and stable software what approach should we take?
1. Add a TEST-PLAN.md explaining your test approach for this task, including different levels & types of test

## Task 2
1. Fix the broken test
1. Add a negative scenario
1. Refactor anything you would improve

## Setup
node version (`v14.18.1`)    
npm version (`6.14.15`)

1. `npm install`
1. `npm test` or `npm run cy:open`
# cypress-tech-test2

## This Cypress test automation script is designed to validate the search functionality on the BBC website (`https://www.bbc.co.uk`). 
# Key Takeaways
- The tests cover three scenarios:
  1. Verifying the presence of expected search results.
  2. Handling no search results and confirming proper feedback is provided.
  3. Testing navigation/pagination behavior when no results are found.
- The recursive function enables dynamic handling of multi-page search results.
- Clear and systematic checks for both functional and edge-case behaviors ensure comprehensive coverage of the search feature.

# Step-by-step explanation of the code:
File: `Cypress/e2e/Search.cy.js`

# Setup and Initial Context
1. `context("Search", () => {`: Defines a test suite named "Search."
2. `beforeEach` Hook:
   - Runs before each test case.
   - Navigates to the website's home page (`cy.visit("/")`) using the `baseUrl` specified in the configuration.
   - Clicks the search button/link (`cy.get(".ssrcss-payrv3-NavigationLink-SearchLink").click();`).

---

# Test Case: 
`it("verify search results", () => {...}`
- Goal: To verify that a specific term (e.g., "christmas") retrieves relevant search results.

1. Search Term Setup:
   - Sets the search term to `"christmas"`.
   - Clears the search input field (`cy.get("searchInput").clear()`), types the term, and presses Enter to submit the search.

2. Results Verification:
   - Waits for the results container (`.ssrcss-knt0go-StyledContainer`) to load and become visible.

3. Recursive Search through Pages:
   - Defines a recursive function `searchThroughPages()` to navigate through search result pages:
     - Checks if the desired text (e.g., "a service for christmas day") exists using a case-insensitive regex (`cy.contains("p", /a service for christmas day/i)`).
     - If found, logs the text.
     - If not found, checks for a "Next" button (`.ssrcss-i6xxyi-IconContainer.ekkqsa20`).
     - If the "Next" button exists, clicks it, waits for the next page to load, and recursively calls `searchThroughPages()` to search again.
     - If no "Next" button exists, logs an error message and throws an exception indicating the text was not found.

4. Execution:
   - Calls `searchThroughPages()` to initiate the search process.

---

Test Case: `it("verify no search results scenario", () => {...}`
- Goal: To verify the behavior when a search term with no results is submitted.

1. Invalid Search Term:
   - Uses an unlikely-to-return-results term (`"zxqwerty12345"`).
   - Clears the search input, types the term, and presses Enter to submit the search.

2. No Results Verification:
   - Checks that a "no results" message container (`.ssrcss-1qik2p5-Stack`) is visible.
   - Verifies the presence of a specific message (`"Sorry, there are no results for"`) to confirm no results were returned.
   - Logs a confirmation that the no-results behavior is as expected.

---

Test Case: `it("verify behavior when navigating without results", () => {...}`
- Goal: To test the behavior of pagination when no results are present.

1. Invalid Search Term:
   - Again uses the term `"zxqwerty12345"`.
   - Clears the search input, types the term, and submits it.

2. Navigation Verification:
   - Checks the visibility of the "no results" message container.
   - Examines the page body:
     - If a "Next" button (`.ssrcss-i6xxyi-IconContainer.ekkqsa20`) exists, clicks it and verifies the presence of the "no results" message on subsequent pages.
     - If no "Next" button exists, logs a message confirming that navigation is disabled due to the lack of results.

---

File: `Cypress/cypress.config.js`

1. Configuration Setup:
   - `defineConfig()`: A Cypress configuration function that:
     - Sets up plugins via `setupNodeEvents`.
     - Specifies the base URL as `https://www.bbc.co.uk`, enabling the shorthand `cy.visit("/")` to work.

---

File: `Cypress/support/e2e.js`

1. Imports `commands.js`:
   - Ensures any custom Cypress commands defined in `commands.js` are available for use in the tests.

---

