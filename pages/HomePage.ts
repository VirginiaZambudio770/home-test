import { Page, Locator, expect } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly welcomeMessage: Locator
  readonly usernameText: Locator

  constructor(page: Page) {
    this.page = page
    this.welcomeMessage = page.locator('#welcome-message h2')
    this.usernameText = page.locator('#welcome-message [data-id="username"]')
  }

  async checkWelcomeMessageVisible() {
    await expect(this.welcomeMessage).toBeVisible({ timeout: 10000 })
  }

  async checkUsername(expectedUsername: string) {
    await expect(this.usernameText).toHaveText(expectedUsername, {
      timeout: 10000,
    })
  }
}
