import fs from 'fs'
import path from 'path'
import stat from 'folder-stat'

function fmr (stats, files) {
  var onlyFiles = stats
    .map((stat, i) => {
      stat.filename = files[i]
      return stat
    })
    .filter(stat => stat.isFile())
  onlyFiles.sort((a, b) => b.mtime - a.mtime)
  return onlyFiles.map(stat => stat.filename)
}

export default function asynch (dir, cb) {
  stat(dir, (err, stats, files) => {
    if (err) return cb(err)
    return cb(null, fmr(stats, files))
  })
}

export function sync (dir) {
  var files = fs.readdirSync(dir)
  var stats = files.map(file => fs.statSync(path.join(dir, file)))
  return fmr(stats, files)
}

export function promise (dir) {
  return new Promise((resolve, reject) => {
    asynch(dir, (err, files) => {
      if (err) reject(err)
      else resolve(files)
    })
  })
}
