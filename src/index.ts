import express from 'express'
import type { Express, Request, Response } from 'express'
import nunjucks from 'nunjucks'
import { join } from 'path'
import { createLinkDataFile } from './lib/link'
import type { resultPromiseForFront, allData } from './interfaces'
import { modifyLabelDataInJson, removeLabelDataInJson, writeLabelDataInJson } from './lib/label'
import { Data } from './lib/data'
import { showResolveMessage } from './lib/utils'

const app: Express = express()
const port = 3005
const appVersion = '0.0.1'

app.use(express.static(join('dist', 'assets')))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'html')
nunjucks.configure(join('dist', 'assets', 'html'), { autoescape: true, express: app, watch: true })

let finalData: allData

function initFinalData (): void {
  finalData = {
    page_id: '',
    title: 'My bookmarks',
    version: appVersion,
    links_menu_active: false,
    labels_menu_active: false,
    hide_labels_wrapper: false,
    label_container_title: '',
    label_to_modify: null,
    main_data: new Map<any, any>()
  }
}

app.get('/', (req: Request, res: Response) => {
  initFinalData()
  finalData.page_id = 'home'
  finalData.label_container_title = 'Afficher les liens ayant les labels suivants'
  res.render('main.html', finalData)
})

app.get('/settings-links', (req: Request, res: Response) => {
  initFinalData()
  finalData.page_id = 'settings-links'
  finalData.links_menu_active = true
  finalData.label_container_title = 'Choisir les labels à associer à ce lien'
  res.render('link-form.html', finalData)
})

app.get('/settings-labels', (req: Request, res: Response) => {
  initFinalData()
  const data = new Data()
  const initData = data.init()
  initData
    .then((resolve) => {
      showResolveMessage(resolve)
      finalData.page_id = 'settings-labels'
      finalData.labels_menu_active = true
      finalData.label_container_title = 'Ajouter un label'
      if (data.labelsData.size > 0) finalData.main_data = data.labelsData
    })
    .then(resolve => {
      res.render('labels-forms.html', finalData)
    })
    .catch((reject) => {

    })
})

app.get('/modify-label/:labelSlug', (req: Request, res: Response) => {
  initFinalData()
  const data = new Data()
  let itemValue: Record<string, object>
  const initData = data.init()
  initData
    .then((resolve) => {
      showResolveMessage(resolve)
      itemValue = data.getEntry('labels', req.params.labelSlug)
    })
    .then(() => {
      finalData.page_id = 'modify-label'
      finalData.label_to_modify = itemValue
      finalData.label_container_title = 'Modifier un label'
    })
    .then(resolve => {
      res.render('labels-forms.html', finalData)
    })
    .catch((reject) => {

    })
})

app.get('/labels/:labelsList', (req: Request, res: Response) => {
  initFinalData()
  // req.params.labelsList
  finalData.page_id = 'labels'
  finalData.label_container_title = 'Afficher les liens ayant les labels suivants'
  res.render('main.html', finalData)
})

app.get('/remove-label/:labelSlug', (req: Request, res: Response) => {
  const removeLabel = removeLabelDataInJson(req.params.labelSlug)
  removeLabel
    .then((resolve) => {
      res.redirect('/settings-labels')
    })
    .catch((reject) => {

    })
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
    const labelCreated = writeLabelDataInJson({
      name: req.body.label_name,
      slug: req.body.label_slug,
      description: req.body.description,
      relatedLinks: []
    })
    labelCreated
      .then((resolve) => {
        res.redirect('/settings-labels')
      })
      .catch((reject) => {

      })
  } else {

  }
})
app.post('/modify-label/:oldKey', (req, res) => {
  if (req.body.label_name !== '') {
    const labelModified = modifyLabelDataInJson(req.params.oldKey, {
      name: req.body.label_name,
      slug: req.body.label_slug,
      description: req.body.description,
      relatedLinks: []
    })
    labelModified
      .then((resolve) => {
        res.redirect('/settings-labels')
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
