export interface CreateComments{
    user_id: string;
    article_id: string;
    title: string;
    text: string;
    name: string;
}

export interface DeleteComments{
    comments_id: string;
    user_id: string;
    article_id: string;
}