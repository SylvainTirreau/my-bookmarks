import {chromium} from "@playwright/test"
import { join } from 'node:path'
import { existsSync} from "node:fs"
import { config } from '../config'

export async function createWebsiteScreenshot(url: string, timestamp: string): Promise<boolean> {
  const screenShotUrl = join(config.screenshotsFolderDist, `${timestamp}.png`)
  let browser = await chromium.launch()

  let page = await browser.newPage()
  // Todo : change size according to the frontend image ratio chosen.
  await page.setViewportSize({width: 1280, height: 1080})
  await page.goto(url)
  await page.screenshot({path: screenShotUrl})
  await browser.close()

  return existsSync(screenShotUrl)
}