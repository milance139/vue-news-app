<template>
    <v-layout row wrap align-center>
        <v-flex xs8 offset-xs2>
            <v-btn small replace color="red" @click="$router.push('/')">GO BACK</v-btn>

            <Article class="my-5" :isArticlePage="true" v-if="articleFound" :article="articleToDisplay"></Article>
            
            <v-alert v-else dense border="left" type="warning" class="my-5">
                Error while fetching article, please <strong>GO BACK</strong> and try again later
            </v-alert>
        </v-flex>
    </v-layout>
</template>

<script>

import { mapState, Store } from 'vuex'
import Article from '../components/Article.vue'

export default {
    components: {
        Article
    },
    data() {
        return{
        }
    },
    computed: {
        ...mapState({
            article: state => state.news.article,
            forwardedArticle: state => state.news.forwardedArticle
        }),
        articleFound() {
            return this.article || Object.keys(this.forwardedArticle).length !== 0
        },
        articleToDisplay() {
            return this.article ? this.article : this.forwardedArticle
        }
    }, 
    beforeCreate() {
        this.$store.dispatch('news/GET_ARTICLE_INFO', this.$route.query.title)
    }
}

</script>

<style>

</style>