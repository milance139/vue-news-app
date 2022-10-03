<template>
   <v-app light>

    <v-container fluid>
      <v-flex xs8 offset-xs2 >
        <v-layout row wrap class="my-5">
                <v-form @submit.prevent="fetchSearchNews" class="align-self-center w-100">
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
                <div class="text-center mt-5 w-100" v-if="newsSearched">
                    <v-select
                        :items="sortingItems"
                        v-model="selectedSortingType"
                        label="Sort by"
                        item-text="title"
                        outlined
                        @change="sortNews()"
                    ></v-select>
                </div>
        </v-layout>
        
        <div v-for="(article, index) in landingPageNews" :key="index">
          <Article :article="article"></Article>
        </div>
                    
        <v-layout row wrap class="my-5">
                <v-btn block elevation="2" v-if="haveMorePages" @click="loadMore()" color="primary">Load more</v-btn>
        </v-layout>

      </v-flex>
    </v-container>
    <v-icon class="go-to-top-button" color="white" @click="toTop">
      mdi-chevron-up
    </v-icon>
  </v-app>
  
</template>

<script>

import Article from '../components/Article.vue'
import { mapState, Store } from 'vuex'

export default {
  components: {
    Article
  },
  data() {
    return {
      searchWord: '',
      selectedSortingType: 'publishedAt',
      newsSearched: false,
      sortingItems: [
        { title: 'Relevancy', value: "relevancy" },
        { title: 'Popularity', value: "popularity" },
        { title: 'Published At', value: "publishedAt" },
      ],
      searchModel: {
        currentPage: 1,
        maxPerPage: 20,
        searchWord: '',
        country: 'us',
        selectedSortingType: "publishedAt"
      }
    }
  },
  computed: {
    ...mapState({
      landingPageNews: state => state.news.landingPageNews,
      totalResults: state => state.news.totalResults
    }),
    pageCount() {
      return Math.ceil(this.totalResults/this.searchModel.maxPerPage);
    },
    haveMorePages() {
      return this.searchModel.currentPage < this.pageCount 
    }
  },
  mounted() {
    this.$store.dispatch('news/GET_HEADLINE_NEWS', this.searchModel)
  },
  methods: {
    resetData() {
      this.searchModel.currentPage = 1;
      this.$store.commit('news/CLEAR_HEADLINE_NEWS');
      this.searchModel.selectedSortingType = "publishedAt"
      this.searchModel.searchWord = ""
      this.searchWord = ""
      this.newsSearched = false
    },
    fetchData() {
      this.$store.dispatch('news/GET_HEADLINE_NEWS', this.searchModel)
    },
    fetchSearchNews() {
      if(this.searchWord !== '')
      {
        if(this.newsSearched != true || this.selectedSortingType != this.searchModel.selectedSortingType || this.searchModel.searchWord != this.searchWord) {
          this.searchModel.currentPage = 1
          this.searchModel.searchWord = this.searchWord.split(' ').join('+')
          this.searchModel.selectedSortingType = this.selectedSortingType
        }
        this.newsSearched = true
        this.$store.dispatch('news/SEARCH_NEWS', this.searchModel)
      }
      else {
        this.fetchData();
        this.newsSearched = false
      }
    },
    sortNews() {
        this.currentPage = 1;
        this.fetchSearchNews();
    },
    cancelSearch() {
      this.resetData()
      this.fetchData()
    },
    loadMore() {
      this.searchModel.currentPage += 1;
      if(this.searchWord !== '') {
        this.fetchSearchNews()
      }
      else {
        this.fetchData();
      }
    },
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
  }

}
</script>

<style>
.go-to-top-button{
  position: fixed !important;
  bottom: 80px;
  right: 80px;
  background: #1976d2 !important;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.w-100{
  width: 100%;
}
</style>
