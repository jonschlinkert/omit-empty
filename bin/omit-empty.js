#!/usr/bin/env node

var omitEmpty = require('../index');

var fs = require('fs');

var file = process.argv[2];

if (!file){
    console.log('\tUSAGE: omitempty file.json');
    return;
}

var updatedContents = omitEmpty(JSON.parse(fs.readFileSync(file)));

console.log(contents)