import { test, expect } from '@playwright/test'

test('inicia una partida y muestra el turno de Pip', async ({ page }) => {
  await page.goto('/')

  const respuesta = page.waitForResponse(
    (res) =>
      res.url().includes('/api/reiniciar') &&
      res.request().method() === 'POST',
  )

  await page.getByTestId('comenzar-partida').click()

  expect((await respuesta).ok()).toBeTruthy()

  await expect(page.getByTestId('turno-banner')).toContainText(/Pip/i)
})

test('mover cambia el turno y la posición visible', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('comenzar-partida').click()

  await page.getByTestId('mover-manta').click()

  await expect(page.getByTestId('turno-banner')).toContainText(/Poppy/i)
  await expect(page.getByTestId('ardilla-pip')).toHaveClass(/pos-manta/)
})

test('la partida finaliza al completar las rondas', async ({ page }) => {
  await page.goto('/')
  await page.getByTestId('comenzar-partida').click()

  for (let turno = 0; turno < 10; turno += 1) {
    const botones = page.locator(
      '[data-testid^="mover-"]:not([disabled])',
    )

    await expect(botones.first()).toBeVisible()
    await botones.first().click()
  }

  await expect(page.getByTestId('resultado')).toBeVisible()
})