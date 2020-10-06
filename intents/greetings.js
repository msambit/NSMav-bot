const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getGreetings = () => {
  const answers = [
    'स्वागत','नमस्कार','हलो','नमस्ते'

  ]
  return random(answers)
}
module.exports = getGreetings