<template>
    <v-layout row wrap align-center>
        <v-flex xs8 offset-xs2>
            <v-btn small replace color="red" @click="$router.push('/')">GO BACK</v-btn>
            <v-card v-if="articleFound" class="my-5">
                <v-card-title> {{ articleToDisplay.title }}</v-card-title>
                <v-img height="350px" v-bind:src="articleToDisplay.urlToImage"></v-img>
                <v-container fill-height fluid>
                    <v-layout>
                        <v-flex xs12 justify-space-between align-end d-flex>
                            <span class="headline">Author: {{ articleToDisplay.author }}</span>
                            <span>Published at: {{ publishedAtDate }}</span>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-text>
                    <h3>{{ articleToDisplay.description }}</h3>
                    <br>
                    {{ articleToDisplay.content }}
                </v-card-text>
                <v-card-actions>
                    <v-chip small color="secondary" class="white--text">
                        {{articleToDisplay.source.name}}
                    </v-chip>

                    <v-spacer></v-spacer>

                    <v-btn small replace color="info" v-bind:href="articleToDisplay.url" target="_blank" >SOURCE</v-btn>
              </v-card-actions>
            </v-card>
            <v-alert v-else dense border="left" type="warning" class="my-5">
                Error while fetching article, please <strong>GO BACK</strong> and try again later
            </v-alert>
        </v-flex>
    </v-layout>
</template>

<script>

import { mapState, Store } from 'vuex'

export default {
    data() {
        return{
        }
    },
    computed: {
        ...mapState({
            article: state => state.news.article,
            forwardedArticle: state => state.news.forwardedArticle
        }),
        publishedAtDate() {
            return new Date(this.articleToDisplay.publishedAt ? this.articleToDisplay.publishedAt : '' ).toLocaleDateString()
        },
        articleFound() {
            return this.article || Object.keys(this.forwardedArticle).length !== 0
        },
        articleToDisplay() {
            return this.article ? this.article : this.forwardedArticle
        }
    }, 
    beforeCreate() {
        this.$store.dispatch('news/GET_ARTICLE_INFO', this.$route.query.title)
    },
    methods: {
        fetchArticle(){
            this.$store.dispatch('news/GET_ARTICLE_INFO', this.$route.query.title)
        }
    }
}

</script>

<style>

</style>