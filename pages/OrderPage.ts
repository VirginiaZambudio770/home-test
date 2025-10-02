import { Locator, Page, expect } from '@playwright/test'

export class OrderPage {
  private readonly orderConfirmationMessage: Locator
  private readonly orderNumber: Locator

  constructor(page: Page) {
    this.orderConfirmationMessage = page.locator('text=Order Confirmed!')
    this.orderNumber = page.locator('text=Order Number:')
  }

  async verifyOrderConfirmation() {
    await expect(this.orderConfirmationMessage).toBeVisible()

    const orderText = await this.orderNumber.textContent()

    const match = orderText?.match(/\d+/)
    expect(match).not.toBeNull() // debe tener número de orden
  }
}
