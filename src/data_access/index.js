const fs = require('fs')

const imports = fs
    .readdirSync(`${__dirname}/`)
    .filter(i => fs.statSync(`${__dirname}/${i}`).isDirectory())
    .map(i => 
        ({
            [i]: require(`./${i}`)
        }) 
    )

console.log(imports)

module.exports = Object.assign({}, ...imports)
