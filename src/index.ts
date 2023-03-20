import express from 'express'
import type { Express, Request, Response } from 'express'
import nunjucks from 'nunjucks'
import { join } from 'path'
import { createLinkDataFile } from './lib/link'
import { type resultPromiseForFront } from './interfaces'
import { createLabelDataFile } from './lib/label'

const app: Express = express()
const port = 3005
const appVersion = '0.0.1'

app.use(express.static(join('dist', 'assets')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'html')
nunjucks.configure(join('dist', 'assets', 'html'), { autoescape: true, express: app, watch: true })

const pageData = {
  page_id: '',
  title: 'My bookmarks',
  version: appVersion,
  links_menu_active: false,
  labels_menu_active: false,
  hide_labels_wrapper: false
}

app.get('/', (req: Request, res: Response) => {
  pageData.page_id = 'home'
  pageData.labels_menu_active = false
  pageData.links_menu_active = false
  pageData.hide_labels_wrapper = false
  res.render('main.html', pageData)
})

app.get('/settings-links', (req: Request, res: Response) => {
  pageData.page_id = 'settings-links'
  pageData.links_menu_active = true
  pageData.labels_menu_active = false
  pageData.hide_labels_wrapper = false
  res.render('link-form.html', pageData)
})

app.get('/settings-labels', (req: Request, res: Response) => {
  pageData.page_id = 'settings-labels'
  pageData.links_menu_active = false
  pageData.labels_menu_active = true
  pageData.hide_labels_wrapper = true
  res.render('labels-forms.html', pageData)
})

app.get('/labels/:labelsList', (req: Request, res: Response) => {
  // req.params.labelsList
  pageData.page_id = 'labels'
  pageData.labels_menu_active = false
  pageData.links_menu_active = false
  pageData.hide_labels_wrapper = false
  res.render('main.html', pageData)
})

app.post('/add-link', (req, res) => {
  if (req.body.url !== '') {
    const linkCreated = createLinkDataFile({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description
    })
    linkCreated
      .then((resolve: resultPromiseForFront) => {
        // Catch the return boolean (resolve.success) and message (resolve.message)
        res.redirect('/')
      })
      .catch((reject) => {

      })
  } else {

  }
})

app.post('/add-label', (req, res) => {
  if (req.body.label_name !== '') {
    const labelCreated = createLabelDataFile({
      name: req.body.label_name,
      slug: req.body.label_slug,
      description: req.body.description
    })
    labelCreated
      .then((resolve: resultPromiseForFront) => {
      // Catch the return boolean (resolve.success) and message (resolve.message)
        res.redirect('/')
      })
      .catch((reject) => {

      })
  } else {

  }
})

app.use((req: Request, res: Response) => {
  res.status(404).send('Erreur 404: Page not found!')
})

app.listen(port, () => {
  console.log(`My bookmarks app is running on port ${port}...`)
})
