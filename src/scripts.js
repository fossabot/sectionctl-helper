const { checkPackageJSON, updatePackageJSON, checkServerConf } = require('./common')

async function run(cli) {
    if (!cli.flags.account || !cli.flags.app) {
        log('Error: Missing Flags')

        if (!cli.flags.account) {
            log('  --account [number] ( or -a [number] ) is required.')
        }
        if (!cli.flags.app) {
            log('  --app [number] ( or -i [number] ) is required.')
        }
        log('Example:')
        log('  $ npx sectionctl-static-deps scripts -a 1887 -i 7749')
        return
    }
    const [fileExists, packageJSON] = checkPackageJSON()
    if (!fileExists) {
        log(error('ERROR: package.json not found in this directory.'))
        return
    }

    await updatePackageJSON(false, packageJSON, cli.flags.account, cli.flags.app)

    await checkServerConf()
}
module.exports.run = run
