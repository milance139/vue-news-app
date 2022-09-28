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

        <HeadlineNews :articles="landingPageNews"></HeadlineNews>
                    
        <v-layout row wrap class="my-5">
            <v-flex xs8 offset-xs2>
                <v-btn block elevation="2" v-if="haveMorePages" @click="loadMore()" color="primary">Load more</v-btn>
            </v-flex>
        </v-layout>

    </v-container>
  </v-app>
</template>

<script>

import HeadlineNews from '../components/HeadlineNews.vue'
import { mapState, Store } from 'vuex'

export default {
  components: {
    HeadlineNews
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
        country: 'gb',
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
    },
    fetchData() {
      this.$store.dispatch('news/GET_HEADLINE_NEWS', this.searchModel)
    },
    fetchSearchNews() {
      if(this.searchWord !== '')
      {
        if(this.newsSearched != true || this.selectedSortingType != this.searchModel.selectedSortingType || this.searchModel.searchWord != this.searchWord) {
          this.searchModel.currentPage = 1
          this.searchModel.searchWord = this.searchWord
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
