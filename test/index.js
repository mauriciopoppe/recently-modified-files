'use strict'

import test from 'ava'
import fs from 'fs-extra'
import touch from 'touch'
import path from 'path'

import mrf, { sync, promise } from '../src/index.js'

test.cb('on a nonexistant folder', t => {
  t.plan(1)
  mrf('./i-dont-exist/', (err, files) => {
    t.truthy(err)
    t.end()
  })
})

test.cb('on an empty folder', t => {
  t.plan(2)
  const folder = './empty/'
  fs.mkdirsSync(folder)
  mrf(folder, (err, files) => {
    t.falsy(err)
    t.deepEqual(files, [])
    fs.removeSync(folder)
    t.end()
  })
})

test.cb('on a folder with multiple files', t => {
  t.plan(1)
  const folder = './files/'
  fs.mkdirsSync(folder)
  touch.sync(path.join(folder, 'a'), { mtime: new Date('2016-04-13') })
  touch.sync(path.join(folder, 'b'), { mtime: new Date() })
  touch.sync(path.join(folder, 'c'), { mtime: new Date('2016-04-10') })
  mrf(folder, (err, files) => {
    if (err) t.end()
    t.deepEqual(files, ['b', 'a', 'c'])
    fs.removeSync(folder)
    t.end()
  })
})

test.cb('on a folder that only has folders', t => {
  t.plan(1)
  const folder = './only-folders/'
  fs.mkdirsSync(folder + 'a')
  fs.mkdirsSync(folder + 'b')
  mrf(folder, (err, files) => {
    if (err) t.end()
    t.deepEqual(files, [])
    fs.removeSync(folder)
    t.end()
  })
})

// sync

test('sync on a folder with multiple files', t => {
  const folder = './files-sync/'
  fs.mkdirsSync(folder)
  touch.sync(folder + 'a', { mtime: new Date('2016-04-13') })
  touch.sync(folder + 'b', { mtime: new Date() })
  touch.sync(folder + 'c', { mtime: new Date('2016-04-10') })
  const files = sync(folder)
  t.deepEqual(files, ['b', 'a', 'c'])
  fs.removeSync(folder)
})

// promisfied
if (global.Promise) {
  test.cb('promisified (using a external promise version)', t => {
    t.plan(1)
    const folder = './files/'
    fs.mkdirsSync(folder)
    touch.sync(path.join(folder, 'a'), { mtime: new Date('2016-04-13') })
    touch.sync(path.join(folder, 'b'), { mtime: new Date() })
    touch.sync(path.join(folder, 'c'), { mtime: new Date('2016-04-10') })
    promise(folder)
      .then(files => {
        t.deepEqual(files, ['b', 'a', 'c'])
        fs.removeSync(folder)
        t.end()
      })
  })
}

