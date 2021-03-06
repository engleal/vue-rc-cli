const inquirer = require('inquirer')
const async = require('async')
const getGitUser = require('../utils/gitUser')
const promptMapping = {
  string: 'input',
  boolean: 'confirm',
}
// 问题列表
const questionObj = {
  name: {
    when: 'isNotTest',
    type: 'string',
    required: true,
    message: '请输入项目名称',
  },
  description: {
    when: 'isNotTest',
    type: 'string',
    required: false,
    message: '请输入项目描述',
    default: 'A Vue.js project',
  },
  author: {
    when: 'isNotTest',
    type: 'string',
    message: '请输入作者名字',
  },
  menuId: {
    when: 'isNotTest',
    type: 'number',
    message: '请输入menuId',
    default: 1
  },
  templateName: {
    when: 'isNotTest',
    type: 'string',
    message: '设置模板标识(用于nigix代理，如opms、rjcos等)',
    default: 'template'
  }
}

module.exports = function askQuestions(answer, projectName) {
  return (files, metalsmith, done) => {
    ask(answer, projectName, done)
  }
}

function ask(answerSheet, projectName, done) {
  questionObj.name.default = projectName
  questionObj.author.default = (getGitUser() && getGitUser().name) || ''
  async.eachSeries(
    Object.keys(questionObj),
    (key, next) => {
      prompt(answerSheet, key, questionObj[key], next)
    },
    done
  )
}

function prompt(answerSheet, key, prompt, done) {
  let promptDefault = prompt.default
  inquirer
    .prompt([
      {
        type: promptMapping[prompt.type] || prompt.type,
        name: key,
        message: prompt.message || prompt.label || key,
        default: promptDefault,
        choices: prompt.choices || [],
        validate: prompt.validate || (() => true),
      },
    ])
    .then((answers) => {
      answerSheet[key] = answers[key]
      done()
    })
    .catch(done)
}
