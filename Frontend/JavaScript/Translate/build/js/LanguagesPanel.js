function LanguagesPanel() {
    self = this;

    self.getLanguages = async () => {
        let languages = await fetch('js/AvailableLanguages.json');

        return await languages.json();
    }
}