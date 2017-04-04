<template lang="html">
    <div class="content">
        <svg class="hidden">
			<defs>
				<symbol id="icon-search" viewBox="0 0 24 24">
					<title>search</title>
					<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
				</symbol>
				<symbol id="icon-cross" viewBox="0 0 24 24">
					<title>cross</title>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				</symbol>
			</defs>
		</svg>

        <div class="search-ctnr">
            <button id="close-search-btn" class="btn close-btn" >
                <svg class="icon cross-icon">
                    <use xlink:href="#icon-cross"></use>
                </svg>
            </button>
            <div class="search-wrapper">
            	<input id="search-input" class="search-input" name="search" type="search" placeholder="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" />
            	<button id="start-search-btn" class="btn open-btn" @click="handleSearch()">
                    <svg class="icon search-icon">
                        <use xlink:href="#icon-search"></use>
                    </svg>
                </button>
            </div>
            <div class="search-overlay"></div>
        </div>


        <!-- grid of images -->
        <div id="grid" class="grid-ctnr maximizer">
            <div class="grid-item" v-for="resultUrl, index in resultUrls"
                    :class="['grid-img', `grid-img-${ index }`]"
                    :style="{ backgroundImage: `url( ${resultUrl} )` }" >
                <div class="grid-padding"></div>
            </div>
        </div>
        <!-- container for saved images -->
        <div id="drop-ctnr" class="drop-ctnr">
            <div class="drop-item" v-for="index in 4"
                    :class="['drop-img', `drop-img-${ index }`]"
                    :style="{ backgroundImage: `url(${ savedUrls[index - 1] == undefined ? '': savedUrls[index - 1] })` }" >
                    <div class="drop-padding"></div>
            </div>

		</div>
        <!-- overlay when saving images -->
		<div class="drop-overlay"></div>

        <!-- button to show saved panel -->
        <button id="view-btn" class="view-btn" @click="handleView()">View Saved Panel</button>
    </div>
</template>

<script>
import Unsplash, { toJson } from 'unsplash-js';
import Drag from './drag';
import Search from './search';

export default {
    data() {
        return {
            title: 'hehe',
            unsplashAPI: new Unsplash({
                applicationId: "86ebf85b28e3e0ca884f9fbe6a0de52ea0acd3643d90ec7ca884189d77d63353",
                secret: "45609de743ad65b3e7b0639d427ff90af5d3e8b96dc0795e6221396ae4f79e95",
                callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
            }),
            savedUrls: [],
            resultUrls: [],
            dragInstance: null,
            searchInstance: null,
        }
    },
    created() {
        this.resultUrls = this.fetchRandom();

        // //TODO delete it
        // this.resultUrls = [
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        //     'http://placehold.it/300x300',
        // ];

    },
    mounted() {
        //TODO delete it
        // this.dragInstance = new Drag('.grid-item', '.drop-ctnr', '.drop-item', this.saveUrl);

        this.searchInstance = new Search();
    },
    computed: {
        output: function() {
        }
    },
    watch: {
        counter: function(value) {

        }
    },
    methods: {
        fetchRandom() {
            const urls = [];
            this.unsplashAPI.photos.listPhotos(1, 9, "latest")
                .then(toJson)
                .then(response => {
                    response.forEach((elem, index) =>{
                        urls.push(elem.urls.thumb);
                    });
                    return urls;
                })
                .then(results => {
                    this.resultUrls = results;
                })
                .then(()=>{
                    this.dragInstance = new Drag('.grid-item', '.drop-ctnr', '.drop-item', this.saveUrl);
                });
        },
        fetchByKeyword(keyword) {
            const urls = [];
            this.unsplashAPI.photos.searchPhotos(keyword)
                .then(toJson)
                .then(response => {
                    console.log(response)
                    response.forEach((elem, index) =>{
                        urls.push(elem.urls.thumb);
                    });
                    return urls;
                })
                .then(results => {
                    this.resultUrls = results;
                })
                .then(()=>{
                    this.dragInstance = new Drag('.grid-item', '.drop-ctnr', '.drop-item', this.saveUrl);
                });
        },
        handleSearch() {
            const searchInput = this.searchInstance.search();
            if (searchInput != '') {
                this.resultUrls = this.fetchByKeyword(searchInput);
                this.searchInstance.closeSearch();
                setTimeout(()=>{
                    this.dragInstance = new Drag('.grid-item', '.drop-ctnr', '.drop-item', this.saveUrl);
                    this.savedUrls = [];
                }, 100);
            }
        },
        handleSave(){

        },
        saveUrl(selectedDiv) {
            const stringToParse = $(selectedDiv).css('background-image');
            const urlString = stringToParse.replace(/(url\(|\)|")/g, '');

            if (this.savedUrls.includes(urlString)) {
                // if in save, not save
            } else {
                this.savedUrls.push(urlString);
            }
            console.log(this.savedUrls)
        },
        checkIfUrlSaved() {

        },
        handleView() {

        }
    }
}
</script>
