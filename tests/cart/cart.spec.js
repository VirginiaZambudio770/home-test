import { test } from '@playwright/test'
import { CartPage } from '../../pages/CartPage'

test('Verify cart page details', async ({ page }) => {
  const cartPage = new CartPage(page)

  await page.goto('/checkout')
  await cartPage.expectCartCountMatchesItems()
  await cartPage.expectTotalPriceToMatchSum()
})
