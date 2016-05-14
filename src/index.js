import fs from 'fs'
import path from 'path'
import stat from 'folder-stat'

function fmr(stats, files) {
  let best = null
  let bestIndex = -1
  var files = stats
    .map((stat, i) => {
      stat.filename = files[i]
      return stat
    })
    .filter(stat => stat.isFile())
  files.sort((a, b) => b.mtime - a.mtime)
  return files.map(stat => stat.filename)
}

export default (dir, cb) => {
  stat(dir, (err, stats, files) => {
    if (err) return cb(err)
    return cb(null, fmr(stats, files))
  })
}

export function sync(dir) { 
  var files = fs.readdirSync(dir)
  var stats = files.map( file => { return fs.statSync(path.join(dir, file)) } )
  return fmr(stats, files)
}

