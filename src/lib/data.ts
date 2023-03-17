import {readFileSync} from "node:fs";
import {config} from "../config";

export class Data {
  labelsData: any
  linksData: any

  constructor() {
    this.labelsData = this.getLabelsData()
    this.linksData = this.getLinksData()
  }

  getLabelsData(): {} {
    return JSON.parse(readFileSync(config.labelsFile).toString())
  }

  getLinksData() {
    return JSON.parse(readFileSync(config.linksFile).toString())
  }

}