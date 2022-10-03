//import {describe, expect, test} from '@jest/globals';
import Article from '../../src/components/Article.vue';
import {mount} from '@vue/test-utils';
import Vuetify from "vuetify";

describe('Article component unit test: ', () => {

    test('is a Vue instance', () => {
        const wrapper = mount(Article, {
            propsData: {
                article: [],
                isArticlePage: false
            }
        })
        expect(wrapper.exists()).toBe(true);
    })
    
})