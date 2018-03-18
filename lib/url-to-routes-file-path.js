module.exports = urlToRoutesFilePath

const {kebabCase} = require('lodash')
const {join: joinPath} = require('path')

/**
 * https://developer.github.com/v3/repos/#get
 * => {scope: 'repos', path: '', id: 'get'}
 * https://developer.github.com/v3/repos/branches/#get-branch
 * => {scope: 'repos', path: '/branches', id: 'get-branch'}
 * https://developer.github.com/v3/activity/events/types/#commitcommentevent
 * => {scope: 'activity', path: '/activity/events', id: 'commitcommentevent'}
 */
function urlToRoutesFilePath (endpoint) {
  const [, scope, path] = endpoint.documentationUrl.match(/\/v3\/([^/#]+)((\/[^/#]+)*)/)
  const id = kebabCase(endpoint.name).replace(/\bgit-hub\b/, 'github')
  return joinPath(
    __dirname,
    '..',
    'routes',
    scope,
    kebabCase(path).replace(/\bgit-hub\b/, 'github'),
    `${id}.json`
  )
}