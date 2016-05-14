import stat from 'folder-stat'

export default (path, cb) => {
  stat(path, (err, stats, files) => {
    if (err) return cb(err)
    let best = null
    let bestIndex = -1
    stats.forEach((stat, i) => {
      if (stat.isFile()) {
        if (!best || stat.mtime > best.mtime) {
          best = stat
          bestIndex = i
        }
      }
    })
    // no files
    if (bestIndex === -1) return cb(null, null)
    return cb(null, files[bestIndex])
  })
}

