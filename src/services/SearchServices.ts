import dbConnection from "../database/knex";
import { ArticlesFromDatabase } from "./interfaces/ISearchServices";


export default class SearchServices{
    async getArticlesByTitle(title: string): Promise<any>{
        const articles = await dbConnection('articles').whereLike('title', `%${title}%`)
        return articles
    }
    async getArticlesBySubtitle(subtitle: string): Promise<any>{
        const articles = await dbConnection('articles').whereLike('title', `%${subtitle}%`)
        return articles
    }
    async getArticlesByText(text: string): Promise<any>{
        const articles = await dbConnection('articles').whereLike('title', `%${text}%`)
        return articles
    }
    cleanSearch(content: string){
        const trashWord = "a, à, agora, ainda, alguém, algum, alguma, algumas, alguns, ampla, amplas, amplo, amplos, ante, antes, ao, aos, após, aquela, aquelas, aquele, aqueles, aquilo, as, até, através, cada, coisa, coisas, com, como, contra, contudo, da, daquele, daqueles, das, de, dela, delas, dele, deles, depois, dessa, dessas, desse, desses, desta, destas, deste, deste, destes, deve, devem, devendo, dever, deverá, deverão, deveria, deveriam, devia, deviam, disse, disso, disto, dito, diz, dizem, do, dos, e, é, ela, elas, ele, eles, em, enquanto, entre, era, essa, essas, esse, esses, esta, está, estamos, estão, estas, estava, estavam, estávamos, este, estes, estou, eu, fazendo, fazer, feita, feitas, feito, feitos, foi, for, foram, fosse, fossem, grande, grandes, há, isso, isto, já, la, lá, lhe, lhes, lo, mas, me, mesma, mesmas, mesmo, mesmos, meu, meus, minha, minhas, muita, muitas, muito, muitos, na, não, nas, nem, nenhum, nessa, nessas, nesta, nestas, ninguém, no, nos, nós, nossa, nossas, nosso, nossos, num, numa, nunca, o, os, ou, outra, outras, outro, outros, para, pela, pelas, pelo, pelos, pequena, pequenas, pequeno, pequenos, per, perante, pode, pude, podendo, poder, poderia, poderiam, podia, podiam, pois, por, porém, porque, posso, pouca, poucas, pouco, poucos, primeiro, primeiros, própria, próprias, próprio, próprios, quais, qual, quando, quanto, quantos, que, quem, são, se, seja, sejam, sem, sempre, sendo, será, serão, seu, seus, si, sido, só, sob, sobre, sua, suas, talvez, também, tampouco, te, tem, tendo, tenha, ter, teu, teus, ti, tido, tinha, tinham, toda, todas, todavia, todo, todos, tu, tua, tuas, tudo, última, últimas, último, últimos, um, uma, umas, uns, vendo, ver, vez, vindo, vir, vos, vós".split(', ')
        const clean = content.split(' ').filter((word)=>{
            return word && trashWord.every(trash => {
                return word.toLowerCase() !== trash
            })
        })
        return clean
    }
    async searchArticleService(content: string): Promise<any>{
        const text = this.cleanSearch(content)
        let arrayArticles: any[] = []
        let auxArticles: ArticlesFromDatabase[] = []
        for(let word of text) {
            arrayArticles.push(await this.getArticlesByText(word))
            arrayArticles.push(await this.getArticlesByTitle(word))
            arrayArticles.push(await this.getArticlesBySubtitle(word))
        }
        arrayArticles.forEach( arrays =>{
            arrays.map((article: ArticlesFromDatabase) => auxArticles.push(article))
        })
        let articleFilter = {}
        const articles = auxArticles.filter((article: ArticlesFromDatabase) =>{
            return articleFilter.hasOwnProperty(article.id) ? false : (articleFilter = {
                ...articleFilter, [article.id]: true
            });
        })
        return articles
    }
}