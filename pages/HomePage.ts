import { Locator, Page, expect } from '@playwright/test'

export class HomePage {
  private readonly checkoutButton: Locator

  constructor(page: Page) {
    this.checkoutButton = page.getByRole('link', { name: 'Form' })
  }

  getCheckoutButton() {
    return this.checkoutButton
  }

  async goToCheckoutPage() {
    await this.checkoutButton.click()
  }
}
