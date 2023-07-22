/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process')
const axios = require('axios')
const mm = require('./markov')

function handleFile(path){

    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log('ERROR: ', err, " with PATH: ", path)
            process.exit(1)
        }
        
        let miniMark = new mm.MarkovMachine(data)
        console.log(miniMark.makeText())
    })

}

async function handleURL(url){
    let res;
    try{
        res = await axios.get(url)
    } catch {
        console.log("ERROR getting data from requested url: ", url)
        process.exit(1)
    }

    let miniMark = new mm.MarkovMachine(res.data)
    console.log(miniMark.makeText())
    

}


try {
    const url = new URL(process.argv[2])
    handleURL(url)
} catch {
    handleFile(process.argv[2])
}