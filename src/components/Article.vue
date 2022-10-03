<template>

    <v-layout row wrap align-center>
          
          <v-flex>
            <v-card class="my-3" hover data-aos="zoom-in" data-aos-easing="ease">
              <v-img
                height="350px"
                v-bind:src="article.urlToImage"
              ></v-img>
                <v-container fill-height fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{ article.title }}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-container v-if="isArticlePage" fluid>
                  <v-layout>
                    <v-flex xs12 justify-space-between align-end d-flex>
                        <span>Author: <b>{{ article.author }}</b></span>
                        <span>Published at: <b>{{ publishedAtDate }}</b></span>
                    </v-flex>
                  </v-layout>
                </v-container>
              <v-card-text>
                <h4>{{ article.description }}</h4>
                <div v-if="isArticlePage">
                  <br>
                  {{ article.content }}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-chip small color="secondary" class="white--text">
                  {{article.source.name}}
                </v-chip>

                <v-spacer></v-spacer>
                <v-btn v-if="isArticlePage" small replace color="info" v-bind:href="article.url" target="_blank" >SOURCE</v-btn>
                <v-btn v-else small replace color="info" @click="readNews()" target="_blank" >READ FULL ARTICLE</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

  </v-layout>

</template>

<script>
export default {
  props: {
      article: {},
      isArticlePage: {
        default: false,
        type: Boolean
      }
  },
  computed: {
    publishedAtDate() {
        return new Date(this.article.publishedAt ? this.article.publishedAt : '' ).toLocaleDateString()
    }
  }, 
  methods: {
    readNews(){
      this.$store.commit('news/SET_FORWARDED_ARTICLE', this.article);
      this.$router.push({ name: 'ArticlePage', query: { title: this.article.title }})
    }
  }
}
</script>