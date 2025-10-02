import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

test.describe('Login Tests', () => {
  test('Login Success', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('http://localhost:3100/login')

    await loginPage.loginWithCredentials('johndoe19', 'supersecret')
    await loginPage.checkSuccessfulLogin()
  })

  test('Login Failure A - Wrong credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('http://localhost:3100/login')

    await loginPage.loginWithCredentials('wronguser', 'wrongpass')

    await expect(page.getByText('Wrong credentials')).toBeVisible()
  })

  test('Login Failure B - Blank fields', async ({ page }) => {
    const loginPage = new LoginPage(page)
    await page.goto('http://localhost:3100/login')

    await loginPage.loginWithCredentials('', '')

    await expect(page.getByText('Fields can not be empty')).toBeVisible()
  })
})
