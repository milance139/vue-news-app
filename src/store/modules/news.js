import axios from 'axios'
import Vue from 'vue'

export const namespaced = true

export const state = {
  article: [],
  landingPageNews: [],
  totalResults: 0
} 

export const mutations = {
  SET_ARTICLE(state, article) {
    state.article = article
  },
  ADD_ARTICLE_TO_HEADLINE(state, article){
    state.landingPageNews.push(article)
  },
  CLEAR_HEADLINE_NEWS(state){
    state.landingPageNews = []
  },
  SET_TOTAL_RESULTS(state, totalResults){
    state.totalResults = totalResults
  }
}

export const actions = {
  GET_ARTICLE_INFO({ commit }, titile) {
      try {
          const apiUrl ='https://newsapi.org/v2/everything?q="' + encodeURIComponent(titile) + '"' +
          '&searchIn=title' +
          '&apiKey=' + Vue.prototype.$apiKey;
          axios.get(apiUrl).then(response => {
            console.log(response.data.articles[0]);
            commit('SET_ARTICLE', response.data.articles[0])
          }).catch(e => {
            console.log("Greška", e);
          });
          
      } catch (error) {
          console.log("Greša: ", error);
      }
  },
  GET_HEADLINE_NEWS({ commit }, searchModel) {
    try {
      const apiUrl = 'https://newsapi.org/v2/top-headlines?country=' + searchModel.country +
      '&pageSize=' + searchModel.maxPerPage +
      '&apiKey=' + Vue.prototype.$apiKey +
      '&page=' + searchModel.currentPage;

      if(searchModel.currentPage == 1) {
        commit('CLEAR_HEADLINE_NEWS')
      }

      axios.get(apiUrl)
        .then(response => {
          response.data.articles.forEach(element => {
            commit('ADD_ARTICLE_TO_HEADLINE', element)
          })
          commit('SET_TOTAL_RESULTS', response.data.totalResults)
        }).catch(e => {
          console.log("Greška", e);
        });

    } catch (error) {
      console.log("Greška", error);
    }
  },
  SEARCH_NEWS({commit}, searchModel) {
    try {
      const apiUrl = 'https://newsapi.org/v2/everything?q=' + searchModel.searchWord +
      '&pageSize=' + searchModel.maxPerPage +
      '&apiKey=' + Vue.prototype.$apiKey +
      '&page=' + searchModel.currentPage + 
      '&sortBy=' + searchModel.selectedSortingType;

      if(searchModel.currentPage == 1) {
        commit('CLEAR_HEADLINE_NEWS')
      }

      axios.get(apiUrl)
        .then(response => {
          response.data.articles.forEach(element => {
            commit('ADD_ARTICLE_TO_HEADLINE', element)
          })
          commit('SET_TOTAL_RESULTS', response.data.totalResults)
        }).catch(e => {
          console.log("Greška", e);
        });

    } catch (error) {
      console.log("Greška", error);
    }
  }
}