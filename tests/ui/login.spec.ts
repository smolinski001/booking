import { test, expect } from "../../src/fixtures/base";
import { user } from "../../src/test-data/users";

test.describe("Logowanie klienta", () => {
  test("LOG-01 @smoke — użytkownik może zalogować się poprawnymi danymi", async ({ pages }) => {
    await pages.loginPage.openLoginPage();
    await pages.loginPage.login(user.email, user.password);

    await expect(pages.homePage.heading).toBeVisible();
  });
});
