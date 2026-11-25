import { type Locator, type Page } from '@playwright/test';

export class SpecialistDetailsPage {
  readonly heading: Locator;
  readonly availableSlots: Locator;
  readonly selectedSlotSummary: Locator;
  readonly reserveButton: Locator;

  constructor(private readonly page: Page) {
    this.heading = page.getByTestId('specialist-name');
    this.availableSlots = page.getByTestId('available-slot');
    this.selectedSlotSummary = page.getByTestId('selected-slot-summary');
    this.reserveButton = page.getByRole('button', { name: 'Zarezerwuj termin' });
  }

  async selectFirstAvailableSlot(): Promise<void> {
    await this.availableSlots.first().click();
  }

  async continueToReservation(): Promise<void> {
    await this.reserveButton.click();
  }
}
