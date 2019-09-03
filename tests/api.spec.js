const axios = require('axios')
const config = require('../configs/index')
describe('Verify API for Blog Redesign', () => {
    let client
    beforeAll(() => {
        client = axios.create({
            baseURL: config.API_BASE
        })
    })
    it('API-Blog Redesign Article', async (done) => {
        const data_article = await client.get('/jsonapi/node/blog_redesign_article?include=field_blog_redesign_content').then(res => res.data)
        expect (data_article.data).toBeDefined()
        expect (data_article.data[0]).toHaveProperty('attributes','path','title')
        expect (data_article.data[0].attributes.path).toHaveProperty('alias')
        expect (data_article.included).toBeDefined()
        expect (data_article.included[0]).toHaveProperty('attributes','relationships','links')
        const data = await client.get('/jsonapi/node/blog_redesign_article?include=uid').then(res => res.data)
        expect(data.data[0].attributes).toBeDefined()
        expect(data.included).toBeDefined()
        expect (data.included[0]).toHaveProperty('attributes','name','mail')
        done()
    }, 20000)
    it('API-Author', async (done) => {
        const data_author = await client.get('jsonapi/user/user?include=user_picture').then(res => res.data)
        expect (data_author.data).not.toBeUndefined()
        expect (data_author.data[0]).toHaveProperty(['attributes','name'])
        expect (data_author.data[0].relationships).toHaveProperty('roles','user_picture')
        expect (data_author.included).not.toBeUndefined()
        done()
    }, 20000)
    it('API-Category', async (done) => {
        const data_category = await client.get('jsonapi/taxonomy_term/blog_categories?include=field_category_image').then(res => res.data)
        expect (data_category.data).toBeDefined()
        expect (data_category.data[0]).toHaveProperty(['attributes','name'])
        expect (data_category.data[0].attributes).toHaveProperty(['path','alias'])
        expect (data_category.included).toBeDefined()
        expect (data_category.included[0]).toHaveProperty('attributes','relationships','links')
        done()
    }, 20000)
})