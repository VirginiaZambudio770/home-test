import { test, expect } from '@playwright/test'
import { CheckoutPage } from '../../pages/CheckoutPage'
import { OrderPage } from '../../pages/OrderPage'

test.describe('Checkout Tests', () => {
  test('Checkout Form Order Success', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page)
    const orderPage = new OrderPage(page)

    await page.goto('http://localhost:3100/checkout')

    await checkoutPage.fillFullName('John Doe')
    await checkoutPage.fillEmail('john@example.com')
    await checkoutPage.fillAddress('123 Main St')
    await checkoutPage.fillCity('New York')
    await checkoutPage.fillState('NY')
    await checkoutPage.fillZip('10001')
    await checkoutPage.fillNameOnCard('John Doe')
    await checkoutPage.fillCreditCardNumber('4111111111111111')
    await checkoutPage.selectExpMonth('December')
    await checkoutPage.fillExpYear('2025')
    await checkoutPage.fillCVV('123')

    const isChecked =
      await checkoutPage.shippingAddressAsBillingButton.isChecked()
    if (!isChecked) {
      await checkoutPage.clickShippingAddressAsBilling()
    }
    await checkoutPage.expectShippingAddressAsBillingChecked()

    await checkoutPage.clickContinueToCheckout()

    await orderPage.verifyOrderConfirmation()
  })
})
