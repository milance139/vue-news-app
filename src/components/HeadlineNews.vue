<template>

    <v-layout row wrap align-center>
          
          <v-flex xs8 offset-xs2>
            <div v-for="(article, index) in articles" :key="index">
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
                <v-card-text>
                  {{ article.description }}
                </v-card-text>
                <v-card-actions>

          
                <v-chip small color="secondary" class="white--text">
                  {{article.source.name}}
                </v-chip>

                <v-spacer></v-spacer>
                <v-btn small replace color="info" @click="readNews(article)" target="_blank" >READ FULL ARTICLE</v-btn>
              </v-card-actions>
            </v-card>
            </div>
          </v-flex>

  </v-layout>

</template>

<script>
export default {
  props: {
      articles: Array
  },
  methods: {
    readNews(article){
      this.$store.commit('news/SET_FORWARDED_ARTICLE', article);
      this.$router.push({ name: 'Article', query: { title: article.title }})
    }
  }
}
</script>