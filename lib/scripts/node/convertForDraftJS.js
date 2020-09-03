/* 
  Development only
  Utility for development seeds to convert text into serialized draft-js json
*/
const DraftJs = require('draft-js')
const { EditorState, ContentState, convertToRaw } = DraftJs

const convert = (text) => {
  const content = ContentState.createFromText(text)
  return JSON.stringify(convertToRaw(content))
}

const textFromArgv = process.argv.slice(2)[0]
const res = convert(textFromArgv)

process.stdout.write(res)
