context("Search", () => {
  beforeEach(() => {
    cy.visit("https://www.bbc.co.uk/");
    cy.get(".ssrcss-payrv3-NavigationLink-SearchLink").click();
  });

  it("verify search results", () => {
    const searchTerm = "christmas";

    // Type and submit the search
    cy.get("#searchInput")
      .should("be.visible")
      .clear()
      .type(`${searchTerm}{enter}`); // Use Enter key to trigger search

    // Ensure results container is loaded
    cy.get('.ssrcss-knt0go-StyledContainer', { timeout: 20000 }).should("be.visible");

    // Recursive function to search through pages
    function searchThroughPages() {
      cy.contains("p", /a service for christmas day/i, { timeout: 5000 })
        .should("exist")
        .then(($element) => {
          if ($element.length > 0) {
            cy.log("Text found:", $element.text());
          } else {
            cy.get("body").then(($body) => {
              if ($body.find(".ssrcss-i6xxyi-IconContainer.ekkqsa20").length) {
                cy.get(".ssrcss-i6xxyi-IconContainer.ekkqsa20").click(); // Click "Next" pagination button
                cy.wait(2000); // Allow time for the next page to load
                searchThroughPages(); // Recursively search the next page
              } else {
                cy.log("No more pages. Text not found.");
                throw new Error("Text not found in any page.");
              }
            });
          }
        });
    }

    searchThroughPages(); // Start the search process
  });

  // it("verify no search results scenario", () => {
  //   const invalidSearchTerm = "zxqwerty12345"; // Unlikely to return results
  //   // Type and submit the search
  //   cy.get("#searchInput")
  //     .should("be.visible")
  //     .clear()
  //     .type(`${invalidSearchTerm}{enter}`); // Use Enter key to trigger search

  //   // Verify that results container is visible but shows no results
  //   cy.get(".results-container", { timeout: 10000 }).should("be.visible");

  //   // Check for a 'no results' message or equivalent indication
  //   cy.contains("No results found", { timeout: 5000 })
  //     .should("exist")
  //     .then(() => {
  //       cy.log("Verified: No results found for the invalid search term.");
  //     });
  // });

  // it("verify behavior when navigating without results", () => {
  //   const searchTerm = "zxqwerty12345"; // Unlikely to return results

  //   // Type and submit the search
  //   cy.get("#searchInput")
  //     .should("be.visible")
  //     .clear()
  //     .type(`${searchTerm}{enter}`); // Use Enter key to trigger search

  //   // Check for navigation elements
  //   cy.get(".results-container", { timeout: 10000 }).should("be.visible");

  //   cy.get("body").then(($body) => {
  //     if ($body.find(".ssrcss-i6xxyi-IconContainer.ekkqsa20").length) {
  //       cy.get(".ssrcss-i6xxyi-IconContainer.ekkqsa20").click();
  //       cy.wait(2000);

  //       // Verify no further results are found
  //       cy.contains("No results found", { timeout: 5000 }).should("exist");
  //     } else {
  //       cy.log("Verified: Navigation disabled due to lack of results.");
  //     }
  //   });
  // });

  // it("verify search failure due to backend or connectivity issue", () => {
  //   // Simulate a network failure or backend error
  //   cy.intercept("GET", /.*search.*/, {
  //     statusCode: 500,
  //     body: {
  //       error: "Internal Server Error",
  //     },
  //   });

  //   const searchTerm = "christmas";

  //   // Type and submit the search
  //   cy.get("#searchInput")
  //     .should("be.visible")
  //     .clear()
  //     .type(`${searchTerm}{enter}`); // Use Enter key to trigger search

  //   // Verify error message or fallback behavior
  //   cy.contains("Something went wrong", { timeout: 5000 })
  //     .should("exist")
  //     .then(() => {
  //       cy.log("Verified: Error message displayed for server failure.");
  //     });
  // });
});
