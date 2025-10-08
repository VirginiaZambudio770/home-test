import { test, expect } from '@playwright/test'
import { CheckoutPage } from '../../pages/CheckoutPage'
import checkoutData from '../../data/checkoutData.json'

test.describe('Checkout Tests', () => {
  let checkoutPage

  test.beforeEach(async ({ page }) => {
    checkoutPage = new CheckoutPage(page)
    await page.goto('/checkout')
  })
  checkoutData.forEach(({ name, data }) => {
    test(name, async () => {
      await checkoutPage.fillForm(data)
      await checkoutPage.clickShippingAddressAsBilling()
      await checkoutPage.ensureShippingAddressAsBillingChecked()
      await checkoutPage.submitForm()
      const orderNumber = await checkoutPage.getOrderNumber()
      expect(orderNumber).not.toBe('')
    })
  })

  test('Checkout Form Alert', async ({ page }) => {
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

  test('Required Fields Validation', async () => {
    await checkoutPage.submitForm()

    const fullNameError = await checkoutPage.fullName.evaluate(
      (el) => el.validationMessage
    )
    expect(fullNameError.toLowerCase()).toMatch(/fill out|complete/i)

    const emailError = await checkoutPage.email.evaluate(
      (el) => el.validationMessage
    )
    expect(emailError.toLowerCase()).toMatch(/email|@|fill out|complete/i)

    const addressError = await checkoutPage.address.evaluate(
      (el) => el.validationMessage
    )
    expect(addressError.toLowerCase()).toMatch(/fill out/i)

    const cityError = await checkoutPage.city.evaluate(
      (el) => el.validationMessage
    )
    expect(cityError.toLowerCase()).toMatch(/fill out/i)

    const stateError = await checkoutPage.state.evaluate(
      (el) => el.validationMessage
    )
    expect(stateError.toLowerCase()).toMatch(/fill out/i)

    const zipError = await checkoutPage.zip.evaluate(
      (el) => el.validationMessage
    )
    expect(zipError.toLowerCase()).toMatch(/fill out/i)

    const nameOnCardError = await checkoutPage.nameOnCard.evaluate(
      (el) => el.validationMessage
    )
    expect(nameOnCardError.toLowerCase()).toMatch(/fill out/i)

    const creditCardNumberError = await checkoutPage.creditCardNumber.evaluate(
      (el) => el.validationMessage
    )
    expect(creditCardNumberError.toLowerCase()).toMatch(/fill out/i)
  })

  test('Invalid Email Format Validation', async () => {
    await checkoutPage.fillForm({
      fullName: 'Jane Doe',
      email: 'invalidEmail',
      address: '456 Elm St',
      city: 'Metrocity',
      state: 'Province',
      zip: '54321',
      nameOnCard: 'Jane Doe',
      creditCardNumber: '4111111111111111',
      expMonth: 'June',
      expYear: '2026',
      CVV: '456',
    })

    await checkoutPage.submitForm()
    const emailError = await checkoutPage.email.evaluate(
      (el) => el.validationMessage
    )
    expect(emailError.toLowerCase()).toMatch(/email|@|fill out|complete/i)
  })
})
