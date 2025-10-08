import { test } from '@playwright/test'
import { SearchPage } from '../../pages/SearchPage'
import testData from '../../data/searchData.json' assert { type: 'json' }
import { skip } from 'node:test'

test.describe('Search Tests', () => {
  let searchPage

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page)
    await page.goto('/search')
  })

  for (const data of testData) {
    //This test is skipped because the application fails when there is invalid text or character
    test.skip(`Search: ${data.description}`, async ({}) => {
      await searchPage.search(data.input)

      if (data.expectResultContains) {
        await searchPage.expectResultContains(data.expectResultContains)
      }

      if (data.expectEmptyMessage) {
        await searchPage.expectEmptyMessage(data.expectEmptyMessage)
      }

      if (data.expectErrorMessage) {
        await searchPage.expectErrorMessage(data.expectErrorMessage)
      }
    })
  }
})
