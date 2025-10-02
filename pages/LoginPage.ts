import { Locator, Page, expect } from '@playwright/test'
import { HomePage } from './HomePage'

export class LoginPage {
  private readonly page: Page
  private readonly usernameTextbox: Locator
  private readonly passwordTextbox: Locator
  private readonly loginButton: Locator
  private readonly welcomeText: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameTextbox = page.getByRole('textbox', { name: 'USERNAME' })
    this.passwordTextbox = page.getByRole('textbox', { name: 'PASSWORD' })
    this.loginButton = page.getByRole('button', { name: 'SIGN IN' })
    this.welcomeText = page.getByRole('heading', { name: 'Welcome!' })
  }

  async fillUsername(username: string) {
    await this.usernameTextbox.fill(username)
  }

  async fillPassword(password: string) {
    await this.passwordTextbox.fill(password)
  }

  async clickOnLogin() {
    await this.loginButton.click()
  }

  async loginWithCredentials(username: string, password: string) {
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickOnLogin()
  }

  async checkSuccessfulLogin() {
    await expect(this.welcomeText).toBeVisible()
    const homePage = new HomePage(this.page)
    await expect(homePage.getCheckoutButton()).toBeVisible()
  }
}
