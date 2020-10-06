


const random = array => { return array[Math.floor(Math.random() * array.length)] }
const getChemistry = () => {
  const answers = [
   'भंगुर','कंडक्टर','नमनीय','तन्यउबलते बिंदु','पिघलने बिंदु','अधातु','धातु','मुझे धातुओं के बारे में अधिक बताएं'
   
   

  ]
  return random(answers)
}
module.exports = getChemistry


