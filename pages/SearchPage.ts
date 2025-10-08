import { Locator, Page, expect } from '@playwright/test'

export class SearchPage {
  private readonly page: Page
  private readonly searchInput: Locator
  private readonly searchButton: Locator
  private readonly resultText: Locator

  constructor(page: Page) {
    this.page = page
    this.searchInput = page.locator('form.example input[name="searchWord"]')
    this.searchButton = page.locator('form.example button[type="submit"]')
    this.resultText = page.locator('#result')
  }

  async goto() {
    await this.page.goto('/search')
  }

  async search(word: string) {
    await this.searchInput.fill(word)
    await this.searchButton.click()
  }

  async getResultText(): Promise<string | null> {
    return this.resultText.textContent()
  }

  async expectResultContains(word: string) {
    await expect(this.resultText).toContainText(word, { timeout: 10000 })
  }

  async expectEmptyMessage(expectedMessage: string) {
    await expect(this.resultText).toContainText(expectedMessage, {
      timeout: 10000,
    })
  }
  async expectErrorMessage(expectedMessage: string) {
    await expect(this.resultText).toContainText(expectedMessage, {
      timeout: 10000,
    })
  }
}
