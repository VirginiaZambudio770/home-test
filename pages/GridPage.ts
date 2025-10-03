import { Page, Locator } from '@playwright/test'

export class GridPage {
  readonly page: Page
  readonly items: Locator

  constructor(page: Page) {
    this.page = page
    this.items = page.locator('#menu .item')
  }

  async goto() {
    await this.page.goto('http://localhost:3100/grid')
  }

  async getItemName(position: number): Promise<string> {
    return this.items
      .nth(position - 1)
      .locator('[data-test-id="item-name"]')
      .innerText()
  }

  async getItemPrice(position: number): Promise<string> {
    return this.items
      .nth(position - 1)
      .locator('#item-price')
      .innerText()
  }

  async getItemImage(position: number): Promise<string> {
    return (
      (await this.items
        .nth(position - 1)
        .locator('img')
        .getAttribute('src')) ?? ''
    )
  }

  async hasAddToOrderButton(position: number): Promise<boolean> {
    return this.items
      .nth(position - 1)
      .locator('[data-test-id="add-to-order"]')
      .isVisible()
  }

  async getItemsCount(): Promise<number> {
    return this.items.count()
  }
}
