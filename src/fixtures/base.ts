import { test as base, expect } from "@playwright/test";

// Page Objects
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { SpecialistSearchPage } from "../pages/SpecialistSearchPage";
import { SpecialistDetailsPage } from "../pages/SpecialistDetailsPage";
import { BookingSummaryPage } from "../pages/BookingSummaryPage";
import { BookingsPage } from "../pages/BookingsPage";

// API
import { BookingApi } from "../api/BookingApi";

// Test data
import { user } from "../test-data/users";

type Pages = {
  loginPage: LoginPage;
  homePage: HomePage;
  specialistSearchPage: SpecialistSearchPage;
  specialistDetailsPage: SpecialistDetailsPage;
  bookingSummaryPage: BookingSummaryPage;
  bookingsPage: BookingsPage;
};

type FrameworkFixtures = {
  pages: Pages;
  authenticatedUser: void;
  bookingApi: BookingApi;
};

export const test = base.extend<FrameworkFixtures>({
  /** Page Objecty korzystające z page */
  pages: async ({ page }, use) => {
    await use({
      loginPage: new LoginPage(page),
      homePage: new HomePage(page),
      specialistSearchPage: new SpecialistSearchPage(page),
      specialistDetailsPage: new SpecialistDetailsPage(page),
      bookingSummaryPage: new BookingSummaryPage(page),
      bookingsPage: new BookingsPage(page),
    });
  },

  /** Przygotowuje zalogowaną sesję dla testów, które jej wymagają. */
  authenticatedUser: async ({ pages }, use) => {
    await pages.loginPage.openLoginPage();
    await pages.loginPage.login(user.email, user.password);
    await expect(pages.homePage.heading).toBeVisible();
    await use();
  },

  bookingApi: async ({ request }, use) => {
    const bookingApi = new BookingApi(request, process.env.API_TOKEN ?? "");
    await use(bookingApi);
  },
});

export { expect };
