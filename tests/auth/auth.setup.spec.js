import { test } from '@playwright/test'
import { LoginPage } from '../../pages/LoginPage'

const authFile = 'storageState.json'

test('Login and save session', async ({ page }) => {
  const loginPage = new LoginPage(page)

  await page.goto('/login')
  await loginPage.loginWithCredentials('johndoe19', 'supersecret')
  await loginPage.loginVerificationMessage()

  await page.context().storageState({ path: authFile })
})
