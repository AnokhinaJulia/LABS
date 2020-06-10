"use strict";

const inputWords = (message) => {
  let input = prompt(message);

  while (!input) {
      alert('Повторите ввод:');
      input = prompt(message);
  }

  return input;
}

const main = () => {
  let input, firstWord, words;
  const message = "Введите слова для обработки:";
  
  do {
    input = inputWords(message);
    if (input)
      [firstWord, ...words] = input.toLowerCase().split(', ');
  } while (!input || words.length === 0)

  const chars = getCharCounters(firstWord);
  let result = '';

  words.forEach(word => {
      result += `${word}: ${compareWords(word, chars)}, `
  });

  alert(result)
};

const getCharCounters = (word) => {
  let charCounters = {};

  for (let char of word) {
      if (charCounters[char]) {
          charCounters[char] += 1;
      } else {
          charCounters[char] = 1
      }
  }

  return charCounters
}

const compareWords = (word, targetChars) => {
  const currentChars = getCharCounters(word);
  let charsLeft = 0;

  for (let char in currentChars) {
      if (!targetChars[char]) {
          charsLeft += currentChars[char];
      } else if (targetChars[char] < currentChars[char]) {
          charsLeft += currentChars[char] - targetChars[char];
      }
  }

  return charsLeft
}

main();