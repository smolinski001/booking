import { test, expect } from "../../src/fixtures/base";
import { specialistSearchData } from "../../src/test-data/search";

test.describe("Wybór terminu wizyty", () => {
  test("BK-UI-01 @smoke — klient wyszukuje specjalistę i wybiera dostępny termin", async ({ authenticatedUser, pages }) => {
    // authenticatedUser przygotowuje zalogowaną sesję przed testem.
    await pages.homePage.openSpecialistSearch();
    await pages.specialistSearchPage.search(specialistSearchData.specialty, specialistSearchData.city);
    await pages.specialistSearchPage.openFirstResult();
    await pages.specialistDetailsPage.selectFirstAvailableSlot();
    await pages.specialistDetailsPage.continueToReservation();

    await expect(pages.bookingSummaryPage.heading).toBeVisible();
    await expect(pages.bookingSummaryPage.specialistName).toBeVisible();
    await expect(pages.bookingSummaryPage.appointmentDate).toBeVisible();
    await expect(pages.bookingSummaryPage.paymentStepLabel).toBeVisible();
  });
});
