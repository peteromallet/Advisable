describe("Sign in", function () {
  beforeEach(() => {
    cy.app("clean"); // have a look at cypress/app_commands/clean.rb
  });

  it("signs in user with valid credentials", function () {
    cy.appFactories([["create", "user", { password: "testing123" }]]).then(
      (records) => {
        const user = records[0];
        cy.visit("/login");
        cy.findByLabelText("Email Address").type(user.email);
        cy.findByLabelText("Password").type("testing123");
        cy.findByRole("button", { name: /login/i }).click();

        cy.url().should("contain", "/projects");
      },
    );
  });
});
