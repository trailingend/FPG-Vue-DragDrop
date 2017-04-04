export default class Search{
    constructor() {
        this.closeBtn = document.querySelector('#close-search-btn'),
        this.searchBtn = document.querySelector('#start-search-btn'),
        this.searchCtnr = document.querySelector('.search-ctnr'),
        this.searchInput = this.searchCtnr.querySelector('.search-input');
        this.addEventListener();
    }
    addEventListener() {
        this.searchInput.addEventListener('focus', () => this.openSearch());
        this.closeBtn.addEventListener('click', () =>this.closeSearch());
    }
    openSearch() {
        this.searchCtnr.classList.add('search-open');
        this.searchInput.focus();
    }
    closeSearch() {
        this.searchCtnr.classList.remove('search-open');
        this.searchInput.blur();
        this.searchInput.value = '';
    }
    search() {
        return this.searchInput.value;
    }
}
