import express, { Express, Request, Response } from "express";
import nunjucks from 'nunjucks'
import { join } from 'path'

const app: Express = express()
const port = 3010

app.use(express.static(join('dist', 'assets')))
app.set('view engine', 'html')
nunjucks.configure(join('dist', 'assets', 'html'), {autoescape: true, express: app, watch: true})

