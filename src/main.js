import Vue from 'vue'
import './style.scss'

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue'
import VueResource from 'vue-resource';
import moment from 'moment-timezone';

Vue.use(VueResource);
moment.tz.setDefault("UTC");

Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

new Vue({
    el: '#app',
    data:{
        genre: [],
        time:[],
        movies: [],
        moment,
        day: moment('2018-01-16T15:15:00.000Z')
    },
    methods:{
        checkFilter(category, title, checked){      
            if(checked){
                this[category].push(title);
            }else{
                let index = this[category].indexOf(title);
                if(index > -1){
                    this[category].splice(index, 1);
                }
            }
        }
    },
    components:{
        MovieList,
        MovieFilter
    },
    created(){
        this.$http.get('/api').then(response => {
            console.log(response.data);
            this.movies = response.data;
        });
    }
});