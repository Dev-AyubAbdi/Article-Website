import { Features } from "tailwindcss";
import supabase from "./supabase";

export const createArticle = async (articles) => {
  console.log("creating article with data");

  const articleData = {
    title: articles.title,
    content: articles.content,
    tags: articles.tags,
    author_id: articles.authorId,
    published: articles.published || false,
    featured_image: articles.featured_imageUrl || null,
  };

  // insert with supabase
  const { data, error } = await supabase
    .from("articles")
    .insert(articleData)
    .select()
    .single();

  if (error) {
    console.error("Error Creating Article", error);
    throw error;
  }

  console.log("creatin article succesfully", data);

  return data;
};

export const getArticleByAuthor = async (
  authorId,
  { includeUnPublished = false, limit = 10, offset = 0 }
) => {
  let query = supabase
    .from("articles")
    .select(
      `
                        *,
                        comments:comments(count)`
    )
    .eq("author_id", authorId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (!includeUnPublished) {
    query = query.eq("published", true);
  }

  const { data, error, count } = await query;

  if (error) throw error;

  return {
    articles: data,
    count,
  };
};

export const deleteArticle = async (id) => {
  console.log(`Attempting to delete article with ID: ${id}`);

  // First delete all associated comments

  const { error: commentsError } = await supabase
    .from("comments")
    .delete()
    .eq("article_id", id);

  if (commentsError) {
    console.error("Error deleting comments:", commentsError);
    console.error(
      "Comments error details:",
      JSON.stringify(commentsError, null, 2)
    );
  } else {
    console.log("Successfully deleted associated comments");
  }

  // Finally delete the article

  const { data, error } = await supabase
    .from("articles")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error deleting article:", error);
    console.error("Article error details:", JSON.stringify(error, null, 2));
    throw error;
  } else {
    console.log(`Successfully deleted article with ID: ${id}`);
  }

  return data;
};

export const getArticleById = async (id) => {
  const { data, error } = await supabase
    .from("articles ") 
    .select(
      `*,
           comments(id,content, created_at,
               user:user_id(id, username, avatar_url)
            ),
            author:author_id(id, username, avatar_url)    
            `
    )
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
};

export const updateArticle = async (id, updates) => {

    console.log(`Attempting to update article with ID: ${id}`, updates)

    const { data, error } = await supabase
        .from('articles')
        .update({
            title: updates.title,
            content: updates.content,
            tags: updates.tags,
            published: updates.published,
            featured_image: updates.featured_imageUrl,
            updated_at: new Date()
        })
        .eq('id', id)
        .select()
        .single()


    if (error) {
        console.error('Error updating article:', error)
        console.error('Update error details:', JSON.stringify(error, null, 2))
        throw error
    }

    console.log('Article updated successfully:', data)
    return data;
}
