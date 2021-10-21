function Translator() {
    let self = this;
    const apiKey = "dict.1.1.20210808T112823Z.e35c5c314b3d99f5.d80aeb85562397a05a7e65f5832e3625cf87faf0";

    let sourceLanguage = 'en';
    let translatedLanguage = 'ru';
    let recentWords = [];

    getLanguages = async () => {
        let uri = "https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=" + apiKey;
        let response = await fetch(uri);

        let json;
        if (response.ok) {
            json = await response.json();
        } else {
            throw new Error();
        }

        return json;
    }

    const renderActiveLinks = async (synonyms) => {
        let sourceSynonyms = document.querySelector('.source-synonyms-container');
        if (sourceSynonyms.classList.contains('source-synonyms--hidden'))
            sourceSynonyms.classList.remove('source-synonyms--hidden');

        let synonymsBody = sourceSynonyms.lastElementChild;
        synonymsBody.innerHTML = '';

        synonyms.map(value => {
            let link = document.createElement('a');
            link.href = '#';
            link.classList.add('synonym-link');
            link.textContent = value.text;

            synonymsBody.append(link);
            synonymsBody.append(' ');
        });

    }

    getTranslate = async (language, sourceText) => {
        const uri = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup";

        recentWords = sessionStorage.recentWords;
        if (recentWords) {
            recentWords = JSON.parse(recentWords);
            let word = recentWords.filter(value => {
                return value.source == sourceText
                    && value.sourceLang == sourceLanguage
                    && value.translatedLang == translatedLanguage;
            });

            if (word.length) {
                renderActiveLinks(JSON.parse(word[0].synonym));
                return word[0].translated;
            }
        }

        let translatedWord = await axios
            .get(uri, {
                params: {
                    key: apiKey,
                    lang: language,
                    text: sourceText
                }
            });

        let synonyms = translatedWord.data.def[0].tr.slice(1, translatedWord.data.def[0].tr.length);
        renderActiveLinks(synonyms);
        console.log(translatedWord.data.def[0]);

        translatedWord = translatedWord.data.def[0].tr[0].text;
        recentWords = sessionStorage.recentWords;
        if (!recentWords)
            recentWords = [];
        else
            recentWords = JSON.parse(recentWords);

        if (recentWords.length === 100)
            recentWords.shift();

        recentWords.push({ source: sourceText, translated: translatedWord, sourceLang: sourceLanguage, translatedLang: translatedLanguage, synonym: JSON.stringify(synonyms) });
        sessionStorage.recentWords = JSON.stringify(recentWords);

        return translatedWord;
    };

    async function renderInputLanguagesList() {
        let languagesPanel = new LanguagesPanel();

        languagesPanel.getLanguages()
            .then(languages => {
                let availableLanguagesPanel = document.querySelector('.input-languages-panel__available-languages');

                let languagesList = document.createElement('ul');
                languagesList.classList.add('available-languages-input');
                languagesList.classList.add('available-languages__input');

                for (let i of languages['languages']) {
                    let languagesListElement = document.createElement('li');
                    languagesListElement.classList.add('available-languages-input__element');
                    languagesListElement.textContent = i['fullName'];

                    languagesList.appendChild(languagesListElement);
                }

                availableLanguagesPanel.appendChild(languagesList);
            });
    }

    async function renderOutputLanguagesList() {
        let languagesPanel = new LanguagesPanel();

        languagesPanel.getLanguages()
            .then(languages => {
                let availableLanguagesPanel = document.querySelector('.output-languages-panel__available-languages');

                let languagesList = document.createElement('ul');
                languagesList.classList.add('available-languages-output');
                languagesList.classList.add('available-languages__output');

                for (let i of languages['languages']) {
                    let languagesListElement = document.createElement('li');
                    languagesListElement.classList.add('available-languages-output__element');
                    languagesListElement.textContent = i['fullName'];

                    languagesList.appendChild(languagesListElement);
                }

                availableLanguagesPanel.appendChild(languagesList);
            });
    }

    self.render = async () => {
        await renderInputLanguagesList();
        await renderOutputLanguagesList();
    };

    async function fillOutputLanguagesArea(languagesAlias) {
        let outputPlace = document.querySelector('.output-body__output-place');
        let inputPlace = document.querySelector('.input-body__input-place');

        await getTranslate(languagesAlias, inputPlace.value)
            .then(value => {
                let translated = value;
                recentWords.push(translated);

                outputPlace.value = translated;

                let copyBtn = document.querySelector('.copy-btn');
                if (copyBtn.classList.contains('copy-btn--disabled')) {
                    copyBtn.classList.remove('copy-btn--disabled');
                }

                let outputArea = document.querySelector('.output-body__output-place');
                if (outputArea.hasAttribute('disabled')) {
                    outputArea.toggleAttribute('disabled');
                }
            })
            .catch(error => {
                outputPlace.value = inputPlace.value;
            });
    }

    async function fillInputLanguagesArea(languagesAlias) {
        let inputPlace = document.querySelector('.input-body__input-place');

        await getTranslate(languagesAlias, inputPlace.value)
            .then(value => {
                let translated = value;
                inputPlace.value = translated;
            });
    }

    let wordsCount;
    document.onkeyup = (event) => {
        let target = event.target;

        let inputPlace = document.querySelector('.input-body__input-place');
        if (target == inputPlace) {
            if (wordsCount > 10000)
                return;

            if (event.keyCode == 13) {
                if (timer)
                    clearTimeout(timer);

                inputPlace.value = inputPlace.value.slice(0, inputPlace.value.length - 1);

                let languagesAlias = sourceLanguage + '-' + translatedLanguage;
                getLanguages()
                    .then(response => {
                        if (response.includes(languagesAlias)) {
                            fillOutputLanguagesArea(languagesAlias);
                        }
                    });

                return;
            }

            let cancelBtn = document.querySelector('.cancel-btn');
            let copyBtn = document.querySelector('.copy-btn');

            if (inputPlace.value) {
                if (cancelBtn.classList.contains('cancel-btn--disabled'))
                    cancelBtn.classList.remove('cancel-btn--disabled');
            }
            else {
                if (!cancelBtn.classList.contains('cancel-btn--disabled'))
                    cancelBtn.classList.add('cancel-btn--disabled');

                if (!copyBtn.classList.contains('copy-btn--disabled')) {
                    copyBtn.classList.add('copy-btn--disabled');
                }

                let sourceSynonyms = document.querySelector('.source-synonyms-container');
                if (!sourceSynonyms.classList.contains('source-synonyms--hidden'))
                    sourceSynonyms.classList.add('source-synonyms--hidden');

                let outputArea = document.querySelector('.output-body__output-place');
                outputArea.value = '';

                if (timer)
                    clearTimeout(timer);

                if (!outputArea.hasAttribute('disabled')) {
                    outputArea.toggleAttribute('disabled');
                }
            }

            let wordsCounter = document.querySelector('.input-body__words-counter');
            wordsCount = inputPlace.value.length;
            wordsCounter.textContent = wordsCount + ' / ' + 10000;
        }
    };

    let timer;
    let inputArea = document.querySelector('.input-body__input-place');
    inputArea.addEventListener('input', event => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            let languagesAlias = sourceLanguage + '-' + translatedLanguage;

            getLanguages()
                .then(response => {
                    if (response.includes(languagesAlias)) {
                        fillOutputLanguagesArea(languagesAlias);
                    }
                });
        }, 3000);
    });

    document.onclick = (event) => {
        let target = event.target;
        let inputLanguagePanel = document.querySelector('.input-languages-panel');
        let outputLanguagePanel = document.querySelector('.output-languages-panel');

        let inputLanguage = document.querySelector('.input-header__language');
        let outputLanguage = document.querySelector('.output-header__language');

        if (target == inputLanguage) {
            inputLanguage.classList.toggle('input-header__language--selected');

            let inputLanguagePanel = document.querySelector('.input-languages-panel');
            inputLanguagePanel.classList.toggle('input-languages-panel--hidden');
        }

        if (target == outputLanguage) {
            outputLanguage.classList.toggle('output-header__language--selected');

            let outputLanguagePanel = document.querySelector('.output-languages-panel');
            outputLanguagePanel.classList.toggle('output-languages-panel--hidden');
        }

        if (target != inputLanguage
            && target != inputLanguagePanel
            && target != inputLanguagePanel.firstElementChild
            && target != inputLanguagePanel.lastElementChild.firstElementChild
            && !inputLanguagePanel.classList.contains('input-languages-panel--hidden')) {
            inputLanguagePanel.classList.toggle('input-languages-panel--hidden');
            inputLanguage.classList.toggle('input-header__language--selected');
        }

        if (target != outputLanguage &&
            target != outputLanguagePanel
            && target != outputLanguagePanel.firstElementChild
            && target != outputLanguagePanel.lastElementChild.firstElementChild
            && !outputLanguagePanel.classList.contains('output-languages-panel--hidden')) {
            outputLanguagePanel.classList.toggle('output-languages-panel--hidden');
            outputLanguage.classList.toggle('output-header__language--selected');
        }

        let cancelBtn = document.querySelector('.cancel-btn');
        let inputPlace = document.querySelector('.input-body__input-place');
        let outputPlace = document.querySelector('.output-body__output-place');
        if (target == cancelBtn
            && !cancelBtn.classList.contains('cancel-btn--disabled')) {
            inputPlace.value = '';
            outputPlace.value = '';
            cancelBtn.classList.add('cancel-btn--disabled');

            let copyBtn = document.querySelector('.copy-btn');
            if (!copyBtn.classList.contains('copy-btn--disabled')) {
                copyBtn.classList.add('copy-btn--disabled');
            }

            if (!outputPlace.hasAttribute('disabled')) {
                outputPlace.toggleAttribute('disabled');
            }

            let wordsCounter = document.querySelector('.input-body__words-counter');
            wordsCount = inputPlace.value.length;
            wordsCounter.textContent = wordsCount + ' / ' + 10000;

            let sourceSynonyms = document.querySelector('.source-synonyms-container');
            if (!sourceSynonyms.classList.contains('source-synonyms--hidden'))
                sourceSynonyms.classList.add('source-synonyms--hidden');
        }

        if (target.classList.contains('available-languages-input__element')) {
            let languagesPanel = new LanguagesPanel();
            languagesPanel.getLanguages()
                .then(response => {
                    let languageFullName = target.textContent;

                    let languages = response['languages'];
                    let oldSourceLanguage = sourceLanguage;
                    sourceLanguage = languages
                        .filter(value =>
                            value['fullName'] == languageFullName)[0]['alias'];

                    inputLanguage.dataset.language = target.textContent;

                    if (inputPlace.value) {
                        let languagesAlias = oldSourceLanguage + '-' + sourceLanguage;
                        getLanguages()
                            .then(response => {
                                if (response.includes(languagesAlias)) {
                                    fillInputLanguagesArea(languagesAlias);
                                }
                            });
                    }
                });
        }

        if (target.classList.contains('available-languages-output__element')) {
            let languagesPanel = new LanguagesPanel();
            languagesPanel.getLanguages()
                .then(response => {
                    let languageFullName = target.textContent;

                    let languages = response['languages'];
                    translatedLanguage = languages
                        .filter(value =>
                            value['fullName'] == languageFullName)[0]['alias'];

                    outputLanguage.dataset.language = target.textContent;

                    if (outputPlace.value) {
                        let languagesAlias = sourceLanguage + '-' + translatedLanguage;

                        getLanguages()
                            .then(response => {
                                if (response.includes(languagesAlias)) {
                                    fillOutputLanguagesArea(languagesAlias);
                                }
                            });
                    }
                });
        }

        let copyBtn = document.querySelector('.copy-btn');
        if (target == copyBtn
            && !cancelBtn.classList.contains('copy-btn--disabled')) {
            let outputArea = document.querySelector('.output-body__output-place');
            if (outputArea.value) {
                outputArea.select();
                document.execCommand("copy");
            }
        }

        let switchBtn = document.querySelector('.switch__btn');
        if (target == switchBtn) {
            let buffer = sourceLanguage;
            sourceLanguage = translatedLanguage;
            translatedLanguage = buffer;

            let bufferLanguage = inputLanguage.dataset.language;
            inputLanguage.dataset.language = outputLanguage.dataset.language;
            outputLanguage.dataset.language = bufferLanguage;

            let bufferText = inputPlace.value;
            inputPlace.value = outputPlace.value;
            outputPlace.value = bufferText;

            let wordsCounter = document.querySelector('.input-body__words-counter');
            wordsCount = inputPlace.value.length;
            wordsCounter.textContent = wordsCount + ' / ' + 10000;

            let langAlias = sourceLanguage + '-' + translatedLanguage;
            getTranslate(langAlias, inputPlace.value);
        }

        let links = document.querySelectorAll('.synonym-link');
        if (links.length && Array.prototype.slice.call(links).includes(event.target)) {
            let inputArea = document.querySelector('.input-body__input-place');
            let buffer = sourceLanguage;
            sourceLanguage = translatedLanguage;
            translatedLanguage = buffer;

            let bufferLanguage = inputLanguage.dataset.language;
            inputLanguage.dataset.language = outputLanguage.dataset.language;
            outputLanguage.dataset.language = bufferLanguage;

            inputArea.value = event.target.textContent;

            let wordsCounter = document.querySelector('.input-body__words-counter');
            wordsCount = inputPlace.value.length;
            wordsCounter.textContent = wordsCount + ' / ' + 10000;

            let langAlias = sourceLanguage + '-' + translatedLanguage;
            getTranslate(langAlias, event.target.textContent)
            .then(value => {
                outputPlace.value = value;
            });
        }
    };
}

let tr = new Translator();

tr.render();

//sessionStorage.setItem('y', [{a: 1, b: 2}, {a: 2, b: 1}]);
