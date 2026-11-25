import { type Locator, type Page } from '@playwright/test';

export class BookingsPage {
  readonly heading: Locator;
  readonly bookingItems: Locator;
  readonly emptyState: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Moje rezerwacje' });
    this.bookingItems = page.getByTestId('booking-item');
    this.emptyState = page.getByTestId('bookings-empty-state');
  }

  async openBookingsPage(): Promise<void> {
    await this.page.goto('/bookings');
  }
}
