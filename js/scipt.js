Object.prototype.length = function () {
  return Object.keys(this).length;
};

class wordTranslater {
  static dictionaryList = document.querySelector(".list__body");

  static addWord(wordInput, translateInput) {
    if (!localStorage.getItem("words")) {
      localStorage.setItem("words", JSON.stringify([]));
    }
    if (wordInput.value && translateInput.value) {
      wordInput.classList.remove("error");
      translateInput.classList.remove("error");
      const wordList = JSON.parse(localStorage.getItem("words"));
      const word = `${wordInput.value}^${translateInput.value}`;
      if (wordList.length > 0) {
        if (wordList.join(" ").includes(word)) return;
      }
      wordList.push(word);
      wordList.sort();
      localStorage.setItem("words", JSON.stringify(wordList));
      this.findWord(wordInput, translateInput);
    } else {
      wordInput.value ? undefined : wordInput.classList.add("error");
      translateInput.value ? undefined : translateInput.classList.add("error");
    }
  }
  static findWord(word, translate) {
    const findIndex = word.value ? 0 : 1;
    const findWord = word.value
      ? word.value.toLowerCase()
      : translate.value.toLowerCase();
    const all = JSON.parse(localStorage.getItem("words"));
    const findedWords = all.filter((wordItem) => {
      const wordSlice = wordItem.split("^");
      if (word.value && translate.value) {
        if (
          wordSlice[0].toLowerCase().includes(word.value) &&
          wordSlice[1].toLowerCase().includes(translate.value)
        ) {
          return wordItem;
        }
      } else {
        if (wordSlice[findIndex].toLowerCase().includes(findWord)) {
          return wordItem;
        }
      }
    });

    this.renderList(findedWords);
  }
  static renderList(foundedWords) {
    this.dictionaryList.innerHTML = "";
    for (let foundWord in foundedWords) {
      const layout = `
      <li class="list__item list-group-item text-dark-emphasis p-3">
        ${foundedWords[foundWord].split("^")[0]} - ${
        foundedWords[foundWord].split("^")[1]
      }
      </li>
      `;
      this.dictionaryList.insertAdjacentHTML("beforeend", layout);
    }
  }
}

const addButton = document.querySelector(".main__button");

addButton.addEventListener("click", () => {
  const wordValue = document.getElementById("inputWord");
  const translateValue = document.getElementById("inputTranslate");
  wordTranslater.addWord(wordValue, translateValue);
});

const inputs = document.querySelectorAll(".main__input");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    input.setAttribute("value", input.value);
    const wordValue = document.getElementById("inputWord");
    const translateValue = document.getElementById("inputTranslate");
    wordTranslater.findWord(wordValue, translateValue);
  });
});
