import express, { Express, Request, Response } from "express";
import nunjucks from 'nunjucks'
import { join } from 'path'
import {Link} from "./lib/link";

const app: Express = express()
const port = 3005

app.use(express.static(join('dist', 'assets')))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'html')
nunjucks.configure(join('dist', 'assets', 'html'), {autoescape: true, express: app, watch: true})

app.get('/', ((req: Request, res: Response) => {
  res.render('index.html', { title: "Mon  titre à moi que j'ai", test: `OK - ` })
}))

app.get('/labels/:labelsList', ((req: Request, res: Response) => {
  res.render('index.html', { title: "Mon  titre à moi que j'ai", test: `${req.params.labelsList} - ` })
}))

app.post('/add-link', (req, res) => {
  if (req.body.url !== '') {
    const link = new Link()
    const linkCreated = link.createLinkData({
      url: req.body.url,
      title: req.body.title,
      description: req.body.description
    })
    linkCreated.then(() => {
      // Res.redirect
      // or change variables...
      res.render('index.html', { title: "", test: req.body.url })
    })
  }
})

app.use((req: Request, res: Response) => {
  res.status(404).send('Erreur 404: Page not found!')
})

app.listen(port, () => {
  console.log(`My bookmarks app is running on port ${port}...`)
})