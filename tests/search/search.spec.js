import { test } from '@playwright/test'
import { SearchPage } from '../../pages/SearchPage'

test('Search Success', async ({ page }) => {
  const searchPage = new SearchPage(page)

  await searchPage.goto()

  const searchWord = 'automation'
  await searchPage.search(searchWord)

  await searchPage.expectResultContains(searchWord)
})

test('Search Empty', async ({ page }) => {
  const searchPage = new SearchPage(page)

  await searchPage.goto()

  await searchPage.search('')

  await searchPage.expectEmptyMessage('Please provide a search word.')
})
