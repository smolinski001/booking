import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly heading: Locator;
  readonly searchLink: Locator;
  readonly bookingsLink: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByRole('heading', { name: 'Witaj w systemie rezerwacji' });
    this.searchLink = page.getByRole('link', { name: 'Znajdź specjalistę' });
    this.bookingsLink = page.getByRole('link', { name: 'Moje rezerwacje' });
  }

  async openHomePage(): Promise<void> {
    await this.page.goto('/');
  }

  async openSpecialistSearch(): Promise<void> {
    await this.searchLink.click();
  }

  async openBookings(): Promise<void> {
    await this.bookingsLink.click();
  }
}
