import { test, expect } from '@playwright/test'
import { CheckoutPage } from '../../pages/CheckoutPage'

test.describe('Checkout Tests', () => {
  test('Checkout Form Order Success', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)
    await page.goto('/checkout')

    await checkoutPage.fillForm({
      fullName: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'Cityville',
      state: 'State',
      zip: '12345',
      nameOnCard: 'John Doe',
      creditCardNumber: '4111111111111111',
      expMonth: 'December',
      expYear: '2025',
      CVV: '123',
    })

    await checkoutPage.clickShippingAddressAsBilling()

    await checkoutPage.ensureShippingAddressAsBillingChecked()

    await checkoutPage.submitForm()

    const orderNumber = await checkoutPage.getOrderNumber()
    expect(orderNumber).not.toBe('')
  })

  test('Checkout Form Alert', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)
    await page.goto('/checkout')

    await checkoutPage.fillForm({
      firstName: 'John',
      lastName: 'Doe',
      address: '123 Main St',
      city: 'Cityville',
      state: 'State',
      zip: '12345',
      country: 'USA',
      creditCardNumber: '4111111111111111',
      expMonth: 'January',
      expYear: '2025',
      cvv: '123',
    })

    await checkoutPage.uncheckShippingSameAsBilling()

    page.once('dialog', async (dialog) => {
      expect(dialog.message()).toBe(
        'Please check the "Shipping address same as billing" checkbox before submitting!'
      )
      await dialog.accept()
    })

    await checkoutPage.submitForm()
  })
})
