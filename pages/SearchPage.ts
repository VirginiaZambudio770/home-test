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
    await expect(this.resultText).toHaveText(`Found one result for ${word}`, {
      timeout: 10000,
    })
  }
  async expectEmptyMessage() {
    await expect(this.resultText).toHaveText('Please provide a search word.', {
      timeout: 10000,
    })
  }
}
