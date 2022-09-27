<template>
   <v-app light>

    <v-container fluid>
        
        <v-layout row wrap class="my-5">
            <v-flex xs8 offset-xs2 >
                <v-form @submit.prevent="fetchSearchNews" class="align-self-center">
                    <v-text-field
                        v-model="searchWord"
                        placeholder="Search news..."
                        filled
                        light
                        hide-details
                        :append-icon = "newsSearched ? 'mdi-close' : 'mdi-magnify'"
                        @click:append="newsSearched ? cancelSearch() : fetchSearchNews()"
                    ></v-text-field>
                </v-form>
                <div class="text-center mt-5" v-if="newsSearched">
                    <v-select
                        :items="sortingItems"
                        v-model="selectedSortingType"
                        label="Sort by"
                        item-text="title"
                        outlined
                        @change="sortNews()"
                    ></v-select>
                </div>
            </v-flex>
        </v-layout>

        <HeadlineNews :articles="articles"></HeadlineNews>
                    
        <v-layout row wrap class="my-5">
            <v-flex xs8 offset-xs2>
                <v-btn block elevation="2" v-if="haveMorePages" @click="loadMore()" color="primary">Load more</v-btn>
            </v-flex>
        </v-layout>

    </v-container>
  </v-app>
</template>

<script>

import axios from 'axios' //importing the axios a HTTP library to connects the app with the API
import HeadlineNews from '../components/HeadlineNews.vue'

export default {
  components: {
    HeadlineNews
  },
  data() {
    return {
      api_key:'9cd715788d1b40c2828d38a9d5c197d6',
      apiUrl: "",
      articles: [],
      currentPage: 1,
      totalResults: 0,
      maxPerPage: 20,
      searchWord: '',
      articles: [],
      sortBy: "",
      newsSearched: false,
      country: 'us',
      selectedSortingType : "relevancy",
      sortingItems: [
        { title: 'Relevancy', value: "relevancy" },
        { title: 'Popularity', value: "popularity" },
        { title: 'Published At', value: "publishedAt" },
      ]
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults/this.maxPerPage);
    },
    haveMorePages() {
      return this.currentPage < this.pageCount 
    }
  },
  created () {
    this.fetchTopNews();
  },
  methods: {
    resetData() {
      this.currentPage = 1;
      this.articles = [];
      this.selectedSortingType = "relevancy"
    },
    fetchTopNews() {
      this.apiUrl = 'https://newsapi.org/v2/top-headlines?country=' + this.country +
                    '&pageSize=' + this.maxPerPage +
                    '&apiKey=' + this.api_key;
      this.searchWord = '';
      
      this.resetData();
      this.fetchData();
    },
    fetchData() {
      axios.get(this.apiUrl + '&page=' + this.currentPage).then(response => {
        response.data.articles.forEach(element => {
          this.articles.push(element)
        });
        this.totalResults = response.data.totalResults
      }).catch(e => {
        console.log("Greska: ", e);
      })
    },
    fetchSearchNews() {
      if(this.searchWord !== '')
      {
        this.apiUrl = 'https://newsapi.org/v2/everything?q=' + this.searchWord +
                      '&pageSize=' + this.maxPerPage +
                      '&apiKey=' + this.api_key +
                      '&sortBy=' + this.selectedSortingType;
        this.resetData();
        this.fetchData();
        this.newsSearched = true;
      }
      else {
        this.fetchTopNews();
        this.newsSearched = false
      }
    },
    sortNews() {
        this.currentPage = 1;
        this.fetchSearchNews();
    },
    cancelSearch() {
      this.searchWord = ""
      this.fetchSearchNews()
    },
    loadMore() {
      this.currentPage += 1;
      this.fetchData();
    }
  }

}
</script>

<style>
.toolbar-items{
  max-width: 400px;
  width: 100%;
}
.fixed-bar{
    position: sticky;
    position: -webkit-sticky; /* for Safari */
    top: 6em;
    z-index: 2;
}
</style>
