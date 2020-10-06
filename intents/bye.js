const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getBye = () => {
  const answers = [
    'बाद में मिलेंगे','जल्दी मिलेंगे','विदाई','अलविदा'



  ]
  return random(answers)
}
module.exports = getBye