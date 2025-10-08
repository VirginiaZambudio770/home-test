import { test, expect } from '@playwright/test'
import { GridPage } from '../../pages/GridPage'

test.describe('Grid Tests', () => {
  let gridPage

  test.beforeEach(async ({ page }) => {
    gridPage = new GridPage(page)
    await page.goto('/grid')
  })

  test('Grid Item Test', async ({}) => {
    const itemName = await gridPage.getItemName(7)
    expect(itemName).toBe('Super Pepperoni')

    const itemPrice = await gridPage.getItemPrice(7)
    expect(itemPrice).toBe('$10')
  })

  test('Grid All Items Test', async ({}) => {
    const count = await gridPage.getItemsCount()

    for (let i = 1; i <= count; i++) {
      const title = await gridPage.getItemName(i)
      const price = await gridPage.getItemPrice(i)
      const image = await gridPage.getItemImage(i)
      const hasButton = await gridPage.hasAddToOrderButton(i)

      expect(title).not.toBe('')
      expect(price).not.toBe('')
      expect(image).not.toBeNull()
      expect(hasButton).toBeTruthy()
    }
  })
})
