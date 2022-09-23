
// const serverPort = 'http://localhost:5000/'
const serverPort = "https://sandbag-golf.heroku.com/"

export function HandicapCalculation(roundsArr: object[], setFunction: any){

  const orderedScores = [...roundsArr].reverse()
  console.log(orderedScores)
  let differentials = orderedScores.map((v: any) => parseFloat(v.differential))
  console.log(differentials)
  if(differentials.length >= 20){
    const lastTwentyScores = differentials.slice(0,20)
    const ascendingDiffs = lastTwentyScores.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,8)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length === 3){
    setFunction(Math.round(Math.min(...differentials) - 2.0)*10/10)
  } else if(differentials.length === 4){
    setFunction(Math.round((Math.min(...differentials)-1.0)*10)/10)
  } else if(differentials.length === 5){
    setFunction(Math.round(Math.min(...differentials)*10)/10)
  } else if(differentials.length === 6){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,2)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round((arrAvg -1.0)*10)/10)
  } else if(differentials.length === 7 || differentials.length === 8){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,2)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length >= 9 && differentials.length <= 11){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,3)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length >= 12 && differentials.length <= 14){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,4)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length === 15 || differentials.length === 16){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,5)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length === 17 || differentials.length === 18){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,6)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length === 19){
    const diffArrayCopy = [...differentials]
    const ascendingDiffs = diffArrayCopy.sort(function(a: number, b: number){return a-b})
    const scoreArr = ascendingDiffs.slice(0,7)
    const arrAvg = scoreArr.reduce((partialSum, a)=> partialSum + a, 0)/scoreArr.length
    setFunction(Math.round(arrAvg*10)/10)
  } else if(differentials.length < 3){
    setFunction("")
  }
}

export async function GetRounds(user: any, setFunction: Function){

  const userMail = user.email.replace('@','at').replace('.', 'dot')

  const response = await fetch(`${serverPort}getRounds/${userMail}`)
  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`
    window.alert(message)
    return
  }
  const userRounds = await response.json()
  setFunction(userRounds)
}