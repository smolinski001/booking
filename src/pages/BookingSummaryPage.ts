import { type Locator, type Page } from '@playwright/test';

export class BookingSummaryPage {
  readonly heading: Locator;
  readonly specialistName: Locator;
  readonly appointmentDate: Locator;
  readonly paymentStepLabel: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Podsumowanie rezerwacji' });
    this.specialistName = page.getByTestId('summary-specialist-name');
    this.appointmentDate = page.getByTestId('summary-appointment-date');
    this.paymentStepLabel = page.getByText('Następny krok: płatność');
  }
}
