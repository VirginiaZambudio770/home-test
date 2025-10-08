import { Locator, Page, expect } from '@playwright/test'

export class CheckoutPage {
  private readonly page: Page
  private readonly fullName: Locator
  private readonly email: Locator
  private readonly address: Locator
  private readonly city: Locator
  private readonly state: Locator
  private readonly zip: Locator
  private readonly nameOnCard: Locator
  private readonly creditCardNumber: Locator
  private readonly expMonth: Locator
  private readonly expYear: Locator
  private readonly CVV: Locator
  private readonly shippingAddressAsBillingButton: Locator
  private readonly continueToCheckoutButton: Locator
  private readonly orderNumber: Locator

  constructor(page: Page) {
    this.page = page
    this.fullName = page.getByRole('textbox', { name: ' Full Name' })
    this.email = page.getByRole('textbox', { name: ' Email' })
    this.address = page.getByRole('textbox', { name: ' Address' })
    this.city = page.getByRole('textbox', { name: ' City' })
    this.state = page.getByRole('textbox', { name: 'State' })
    this.zip = page.getByRole('textbox', { name: 'Zip' })
    this.nameOnCard = page.getByRole('textbox', { name: 'Name on Card' })
    this.creditCardNumber = page.getByRole('textbox', {
      name: 'Credit card number',
    })
    this.expMonth = page.getByRole('combobox', { name: 'Exp Month' })
    this.expYear = page.getByRole('textbox', { name: 'Exp Year' })
    this.CVV = page.getByRole('textbox', { name: 'CVV' })
    this.shippingAddressAsBillingButton = page.locator('[name="sameadr"]')
    this.continueToCheckoutButton = page.getByRole('button', {
      name: 'Continue to checkout',
    })
    this.orderNumber = page.locator('[data-id="ordernumber"]')
  }

  async fillFullName(value: string) {
    await this.fullName.fill(value)
  }
  async fillEmail(value: string) {
    await this.email.fill(value)
  }
  async fillAddress(value: string) {
    await this.address.fill(value)
  }
  async fillCity(value: string) {
    await this.city.fill(value)
  }
  async fillState(value: string) {
    await this.state.fill(value)
  }
  async fillZip(value: string) {
    await this.zip.fill(value)
  }
  async fillNameOnCard(value: string) {
    await this.nameOnCard.fill(value)
  }
  async fillCreditCardNumber(value: string) {
    await this.creditCardNumber.fill(value)
  }
  async selectExpMonth(label: string) {
    await this.expMonth.selectOption({ label })
  }
  async fillExpYear(value: string) {
    await this.expYear.fill(value)
  }
  async fillCVV(value: string) {
    await this.CVV.fill(value)
  }

  async clickShippingAddressAsBilling() {
    await this.shippingAddressAsBillingButton.click()
  }

  async ensureShippingAddressAsBillingChecked() {
    await this.shippingAddressAsBillingButton.waitFor({
      state: 'visible',
      timeout: 10000,
    })
    const isChecked = await this.shippingAddressAsBillingButton.isChecked()
    if (!isChecked) {
      await this.shippingAddressAsBillingButton.check()
    }
    await expect(this.shippingAddressAsBillingButton).toBeChecked()
  }

  async expectShippingAddressAsBillingNotChecked() {
    await expect(this.shippingAddressAsBillingButton).not.toBeChecked()
  }

  async uncheckShippingSameAsBilling() {
    const checked = await this.shippingAddressAsBillingButton.isChecked()
    if (checked) await this.shippingAddressAsBillingButton.uncheck()
  }

  async submitForm() {
    await this.continueToCheckoutButton.click()
  }

  async getOrderNumber(): Promise<string> {
    return (await this.orderNumber.textContent())?.trim() || ''
  }

  async fillForm(data: {
    fullName?: string
    email?: string
    address?: string
    city?: string
    state?: string
    zip?: string
    nameOnCard?: string
    creditCardNumber?: string
    expMonth?: string
    expYear?: string
    CVV?: string
    shippingAddressAsBilling?: boolean
  }): Promise<void> {
    if (data.fullName) await this.fillFullName(data.fullName)
    if (data.email) await this.fillEmail(data.email)
    if (data.address) await this.fillAddress(data.address)
    if (data.city) await this.fillCity(data.city)
    if (data.state) await this.fillState(data.state)
    if (data.zip) await this.fillZip(data.zip)
    if (data.nameOnCard) await this.fillNameOnCard(data.nameOnCard)
    if (data.creditCardNumber)
      await this.fillCreditCardNumber(data.creditCardNumber)
    if (data.expMonth) await this.selectExpMonth(data.expMonth)
    if (data.expYear) await this.fillExpYear(data.expYear)
    if (data.CVV) await this.fillCVV(data.CVV)
    if (data.shippingAddressAsBilling)
      await this.clickShippingAddressAsBilling()
  }
}
