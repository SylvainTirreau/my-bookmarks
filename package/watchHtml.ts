import { watch } from 'chokidar'

if (typeof require !== 'undefined' && require.main === module) {
  watch('./src/assets/html').on('all', (event, path) => {
    console.log(event, path)
  })
}