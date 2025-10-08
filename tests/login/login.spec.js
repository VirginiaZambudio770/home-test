import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login Tests', () => {
  let loginPage

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    await page.goto('/login')
  })

  test('Login Success', async ({}) => {
    await loginPage.loginWithCredentials('johndoe19', 'supersecret')
    await loginPage.loginVerificationMessage()
  })

  test('Login Failure A - Wrong credentials', async ({ page }) => {
    await loginPage.loginWithCredentials('wronguser', 'wrongpass')
    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('Login Failure B - Blank fields', async ({ page }) => {
    await loginPage.loginWithCredentials('', '')
    await expect(page.getByText('Fields can not be empty')).toBeVisible()
  })
})
