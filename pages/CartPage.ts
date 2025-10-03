import { Locator, Page, expect } from '@playwright/test'

export class CartPage {
  readonly page: Page
  readonly cartCounter: Locator
  readonly totalPrice: Locator
  readonly productItems: Locator

  constructor(page: Page) {
    this.page = page
    this.cartCounter = page.locator('.container h4 span.price b') // contador del carrito
    this.totalPrice = page.locator('.container p span.price b').last() // total
    // Solo los <p> que contienen un <a> y un <span class="price">
    this.productItems = page.locator('.container p:has(a):has(span.price)')
  }

  async getCartItemsCount(): Promise<number> {
    return await this.productItems.count()
  }

  async getCartCount(): Promise<number> {
    const countText = await this.cartCounter.textContent()
    return Number(countText)
  }

  async expectCartCountMatchesItems() {
    const itemsCount = await this.getCartItemsCount()
    const cartCount = await this.getCartCount()
    expect(cartCount).toBe(itemsCount)
  }

  async expectTotalPriceToMatchSum() {
    let sum = 0
    const count = await this.getCartItemsCount()
    for (let i = 0; i < count; i++) {
      const priceText = await this.productItems
        .nth(i)
        .locator('span.price')
        .textContent()
      if (priceText) {
        sum += Number(priceText.replace('$', ''))
      }
    }
    const totalText = await this.totalPrice.textContent()
    expect(Number(totalText?.replace('$', ''))).toBeCloseTo(sum, 1)
  }
}
