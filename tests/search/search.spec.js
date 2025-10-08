import { test } from '@playwright/test'
import { SearchPage } from '../../pages/SearchPage'

test.describe('Search Tests', () => {
  let searchPage

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page)
    await page.goto('/search')
  })

  test('Search Success', async ({ page }) => {
    const searchWord = 'automation'
    await searchPage.search(searchWord)
    await searchPage.expectResultContains(searchWord)
  })

  test('Search Empty', async ({ page }) => {
    await searchPage.search('')
    await searchPage.expectEmptyMessage('Please provide a search word.')
  })
})
