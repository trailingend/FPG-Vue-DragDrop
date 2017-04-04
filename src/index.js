import '../style/style.scss';
import Vue from 'vue';
import 'babel-polyfill';

import {testPlatform} from './utils';
import $ from 'jquery';

import App from './App.vue';



window.platform = testPlatform();

const app = new Vue({
    components: {
        App,
    },
}).$mount('#container');
