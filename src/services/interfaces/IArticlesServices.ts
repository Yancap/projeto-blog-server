export interface CreateArticle{
    title: string;
    subtitle: string;
    text: string;
    user_id: string;
    author: string;
    image: string;
}
export interface UpdateArticle{
    title: string;
    subtitle: string;
    text: string;
    id: string;
    user_id: string;
    image: string;
}

export interface DeleteArticle{
    user_id: string;
    article_id: string;
}