import { Features } from 'tailwindcss'
import supabase from './supabase'

export const createArticle = async (articles) => {

    console.log("creating article with data")

    const articleData = {
        title: articles.title,
        content: articles.content,
        tags: articles.tags,
        author_id: articles.authorId,
        published: articles.published || false,
        featured_image: articles.featured_imageUrl || null
    }

    // insert with supabase
        const {data, error } = await supabase
        .from("articles")
        .insert(articleData)
        .select()
        .single()

        if(error) {
            console.error("Error Creating Article", error)
            throw error
        }

        console.log("creatin article succesfully", data)

        return data
}

export const getArticleByAuthor = async (authorId, { includeUnPublished = false, limit = 10, offset = 0 }) => {


    let query = supabase
        .from('articles')
        .select(`
                        *,
                        comments:comments(count)`)
        .eq('author_id', authorId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)


    if (!includeUnPublished) {
        query = query.eq('published', true)
    }


    const { data, error, count } = await query

    if (error) throw error

    return {
        articles: data,
        count
    }
}

export const deleteArticle = async (id) => {

    console.log(`Attempting to delete article with ID: ${id}`)


    // First delete all associated comments

    const { error: commentsError } = await supabase.from('comments').delete().eq('article_id', id)


    if (commentsError) {
        console.error('Error deleting comments:', commentsError)
        console.error('Comments error details:', JSON.stringify(commentsError, null, 2))
    } else {
        console.log('Successfully deleted associated comments')
    }


    // Finally delete the article

    const { data, error } = await supabase.from('articles').delete().eq('id', id).select();



    if (error) {
        console.error('Error deleting article:', error)
        console.error('Article error details:', JSON.stringify(error, null, 2))
        throw error

    } else {
        console.log(`Successfully deleted article with ID: ${id}`)
    }

    return data
}

