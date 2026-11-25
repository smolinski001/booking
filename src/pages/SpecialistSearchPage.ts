import { type Locator, type Page } from '@playwright/test';

export class SpecialistSearchPage {
  readonly specialtyInput: Locator;
  readonly cityInput: Locator;
  readonly searchButton: Locator;
  readonly resultCards: Locator;
  readonly emptyState: Locator;

  constructor(private readonly page: Page) {
    this.specialtyInput = page.getByTestId('search-specialty');
    this.cityInput = page.getByTestId('search-city');
    this.searchButton = page.getByRole('button', { name: 'Szukaj' });
    this.resultCards = page.getByTestId('specialist-card');
    this.emptyState = page.getByTestId('search-empty-state');
  }

  async openSpecialistSearchPage(): Promise<void> {
    await this.page.goto('/specialists');
  }

  async search(specialty: string, city: string): Promise<void> {
    await this.specialtyInput.fill(specialty);
    await this.cityInput.fill(city);
    await this.searchButton.click();
  }

  async openFirstResult(): Promise<void> {
    await this.resultCards.first().getByRole('link', { name: 'Zobacz profil' }).click();
  }
}
