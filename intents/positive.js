const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getpositiveC = () => {
  const answers = [
    'काफी अच्छा लगा','अच्छा','अच्छा लगा','हाँ,अच्छा लगा','हाँ,अच्छा है','हाँ'



  ]
  return random(answers)
}
module.exports = getpositiveC