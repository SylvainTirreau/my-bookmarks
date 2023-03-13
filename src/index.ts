import express, { Express, Request, Response } from "express";
import nunjucks from 'nunjucks'
import { join } from 'path'

const app: Express = express()
const port = 3005

app.use(express.static(join('dist', 'assets')))
app.set('view engine', 'html')
nunjucks.configure(join('dist', 'assets', 'html'), {autoescape: true, express: app, watch: true})

app.get('/', ((req: Request, res: Response) => {
  res.render('index.html', { title: "Mon  titre à moi que j'ai", test: "OK" })
}))

app.get('/:labels', ((req: Request, res: Response) => {
  res.render('index.html', { title: "Mon  titre à moi que j'ai", test: req.params.labels })
}))

app.use((req: Request, res: Response) => {
  //res.status(404).render('error.html', { code: '404', text: 'Cette URL ne mène nulle part' })
})

app.listen(port, () => {
  console.log(`My bookmarks is running on port ${port}...`)
})