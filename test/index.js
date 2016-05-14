'use strict'

import mostRecentFile from '../src/index.js'
import test from 'ava'

test.cb('on a nonexistant folder', t => {
  t.plan(1)
  mostRecentFile('./fixtures/i-dont-exist/', (err, file) => {
    t.truthy(err)
    t.end()
  })
})

test.cb('on an empty folder', t => {
  t.plan(2)
  mostRecentFile('./fixtures/empty/', (err, file) => {
    t.falsy(err)
    t.is(file, null)
    t.end()
  })
})

test.cb('on a folder with multiple files', t => {
  t.plan(1)
  mostRecentFile('./fixtures/files/', (err, file) => {
    if (err) t.end()
    t.is(file, 'c')
    t.end()
  })
})

test.cb('on a folder with multiple files excluding symlinks', t => {
  t.plan(1)
  mostRecentFile('./fixtures/with-symlinks/', (err, file) => {
    if (err) t.end()
    t.is(file, 'c')
    t.end()
  })
})

test.cb('on a folder that only has folders', t => {
  t.plan(1)
  mostRecentFile('./fixtures/', (err, file) => {
    if (err) t.end()
    t.is(file, null)
    t.end()
  })
})
