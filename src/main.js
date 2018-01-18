import Vue from 'vue'
import './style.scss'
import VueResource from 'vue-resource';
import routes from './util/routes';
import moment from 'moment-timezone';
import { checkFilter, setDay } from './util/bus';
import VueRouter from 'vue-router';
import Tooltip from './util/tooltip';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Tooltip);
moment.tz.setDefault("UTC");
const bus = new Vue();

Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    router: router,
    data:{
        genre: [],
        time:[],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    created(){
        this.$http.get('/api').then(response => {
            console.log(response.data);
            this.movies = response.data;
        });
        this.$bus.$on('check-filter', checkFilter.bind(this));
        this.$bus.$on('set-day', setDay.bind(this));
    }
});