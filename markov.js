/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {}
    for (let i = 0; i < this.words.length; i++){
      let w = this.words[i]
      if (!(w in this.chains)){
        this.chains[w] = []
      }
      if (!(this.words[i + 1] in this.chains[w])){
        if (!(this.words[i+1])){
          this.chains[w].push(null)
        } else {
          this.chains[w].push(this.words[i + 1])
        }
      }
      
    }
    
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let text = []
    let keys = Object.keys(this.chains)

    text.push(keys[Math.floor(Math.random() * keys.length)])
    

    
    while(text.length < 100){

      let chain = this.chains[text.at(-1)]

      let nextWord = chain[Math.floor(Math.random() * chain.length)]
      if (nextWord == null){
        break
      }
      text.push(nextWord)
    }

    text = text.join(' ')
    return text.replace(text.charAt(0), text.charAt(0).toUpperCase())
  }
}


module.exports = {
  MarkovMachine,
};
