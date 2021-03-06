const program = require('commander')

// 无参数时
function empty_parame(params) {
  program.usage('<template-name> [project-name]')
}

// init帮助命令
function help_init() {
  program
    .command('init')
    .description('create a new project powered by vue-cli-service')
    .option(
      '-p, --preset <presetName>',
      'Skip prompts and use saved or remote preset'
    )
    .option('-d, --default', 'Skip prompts and use default preset')
    .option(
      '-i, --inlinePreset <json>',
      'Skip prompts and use inline JSON string as preset'
    )
    .option(
      '-m, --packageManager <command>',
      'Use specified npm client when installing dependencies'
    )
    .option(
      '-r, --registry <url>',
      'Use specified npm registry when installing dependencies (only for npm)'
    )
    .option(
      '-g, --git [message]',
      'Force git initialization with initial commit message'
    )
    .option('-n, --no-git', 'Skip git initialization')
    .option('-f, --force', 'Overwrite target directory if it exists')
    .option('--merge', 'Merge target directory if it exists')
    .option('-c, --clone', 'Use git clone when fetching remote preset')
    .option(
      '-x, --proxy <proxyUrl>',
      'Use specified proxy when creating project'
    )
    .option('-b, --bare', 'Scaffold project without beginner instructions')
    .option('--skipGetStarted', 'Skip displaying "Get started" instructions')
}
