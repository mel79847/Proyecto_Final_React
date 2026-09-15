import { expect, test } from '@playwright/test'

test('inicia una partida y muestra el turno de Pip', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Comenzar picnic' }).click()
  await expect(page.getByTestId('turno-banner')).toContainText('Pip')
})

test('mover cambia el turno y la posición visible', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Comenzar picnic' }).click()
  await page.getByTestId('mover-manta').click()
  await expect(page.getByTestId('turno-banner')).toContainText('Poppy')
  await expect(page.getByTestId('ardilla-pip')).toHaveClass(/pos-manta/)
})

test('la partida finaliza al completar las rondas', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Comenzar picnic' }).click()

  for (let turno = 0; turno < 10; turno += 1) {
    const botones = page.locator('[data-testid^="mover-"]:not([disabled])')
    await botones.first().click()
    if (await page.getByTestId('resultado').count()) break
  }

  await expect(page.getByTestId('resultado')).toBeVisible()
})
