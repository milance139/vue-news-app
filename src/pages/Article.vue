<template>
    <v-layout row wrap align-center>
        <v-flex xs8 offset-xs2>
            <v-card class="my-5">
                <v-card-title> {{ article.title }}</v-card-title>
                <v-img height="350px" v-bind:src="article.urlToImage"></v-img>
                <v-container fill-height fluid>
                    <v-layout>
                        <v-flex xs12 align-end d-flex>
                            <span class="headline">Author: {{ article.author }}</span>
                        </v-flex>
                    </v-layout>
                </v-container>
                <v-card-text>
                    <h3>{{ article.description }}</h3>
                    <br>
                    {{ article. content }}
                </v-card-text>
                <v-card-actions>
                    <v-chip small color="secondary" class="white--text">
                        {{article.source.name}}
                    </v-chip>

                    <v-spacer></v-spacer>

                    <v-btn small replace color="info" v-bind:href="article.url" target="_blank" >SOURCE</v-btn>
              </v-card-actions>
            </v-card>
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
    mounted() {
        this.fetchArticle()
    },
    computed: {
        ...mapState({
            article: state => state.news.article
        })
    },
    methods: {
        async fetchArticle(){
            await this.$store.dispatch('news/GET_ARTICLE_INFO', this.$route.query.title)
        }
    }
}

</script>

<style>

</style>