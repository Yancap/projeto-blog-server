"use strict";var Re=Object.create;var T=Object.defineProperty;var qe=Object.getOwnPropertyDescriptor;var Ae=Object.getOwnPropertyNames;var xe=Object.getPrototypeOf,ve=Object.prototype.hasOwnProperty;var L=(a,e)=>()=>(a&&(e=a(a=0)),e);var M=(a,e)=>()=>(e||a((e={exports:{}}).exports,e),e.exports),H=(a,e)=>{for(var s in e)T(a,s,{get:e[s],enumerable:!0})},J=(a,e,s,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Ae(e))!ve.call(a,r)&&r!==s&&T(a,r,{get:()=>e[r],enumerable:!(t=qe(e,r))||t.enumerable});return a};var R=(a,e,s)=>(s=a!=null?Re(xe(a)):{},J(e||!a||!a.__esModule?T(s,"default",{value:a,enumerable:!0}):s,a)),z=a=>J(T({},"__esModule",{value:!0}),a);var Q={};H(Q,{default:()=>u});var u,p=L(()=>{"use strict";u=class{message;status;typeError;code;constructor(e,s,t=400,r){this.message=e,this.typeError=s,this.status=t,this.code=r}}});var X=M((Pe,V)=>{"use strict";var K=R(require("path"));V.exports={development:{client:"sqlite3",connection:{filename:K.default.resolve(__dirname,"database.db")},pool:{afterCreate:(a,e)=>a.run("PRAGMA foreign_keys = ON",e)},useNullAsDefault:!0,migrations:{directory:K.default.resolve(__dirname,"src","database","knex","migrations")}}}});var W={};H(W,{default:()=>i});var Y,Z,be,i,f=L(()=>{"use strict";Y=R(require("knex")),Z=R(X()),be=(0,Y.default)(Z.default.development),i=be});var S,ue=L(()=>{"use strict";f();S=class{async getArticlesByTitle(e){return await i("articles").whereLike("title",`%${e}%`)}async getArticlesBySubtitle(e){return await i("articles").whereLike("title",`%${e}%`)}async getArticlesByText(e){return await i("articles").whereLike("title",`%${e}%`)}cleanSearch(e){let s="a, \xE0, agora, ainda, algu\xE9m, algum, alguma, algumas, alguns, ampla, amplas, amplo, amplos, ante, antes, ao, aos, ap\xF3s, aquela, aquelas, aquele, aqueles, aquilo, as, at\xE9, atrav\xE9s, cada, coisa, coisas, com, como, contra, contudo, da, daquele, daqueles, das, de, dela, delas, dele, deles, depois, dessa, dessas, desse, desses, desta, destas, deste, deste, destes, deve, devem, devendo, dever, dever\xE1, dever\xE3o, deveria, deveriam, devia, deviam, disse, disso, disto, dito, diz, dizem, do, dos, e, \xE9, ela, elas, ele, eles, em, enquanto, entre, era, essa, essas, esse, esses, esta, est\xE1, estamos, est\xE3o, estas, estava, estavam, est\xE1vamos, este, estes, estou, eu, fazendo, fazer, feita, feitas, feito, feitos, foi, for, foram, fosse, fossem, grande, grandes, h\xE1, isso, isto, j\xE1, la, l\xE1, lhe, lhes, lo, mas, me, mesma, mesmas, mesmo, mesmos, meu, meus, minha, minhas, muita, muitas, muito, muitos, na, n\xE3o, nas, nem, nenhum, nessa, nessas, nesta, nestas, ningu\xE9m, no, nos, n\xF3s, nossa, nossas, nosso, nossos, num, numa, nunca, o, os, ou, outra, outras, outro, outros, para, pela, pelas, pelo, pelos, pequena, pequenas, pequeno, pequenos, per, perante, pode, pude, podendo, poder, poderia, poderiam, podia, podiam, pois, por, por\xE9m, porque, posso, pouca, poucas, pouco, poucos, primeiro, primeiros, pr\xF3pria, pr\xF3prias, pr\xF3prio, pr\xF3prios, quais, qual, quando, quanto, quantos, que, quem, s\xE3o, se, seja, sejam, sem, sempre, sendo, ser\xE1, ser\xE3o, seu, seus, si, sido, s\xF3, sob, sobre, sua, suas, talvez, tamb\xE9m, tampouco, te, tem, tendo, tenha, ter, teu, teus, ti, tido, tinha, tinham, toda, todas, todavia, todo, todos, tu, tua, tuas, tudo, \xFAltima, \xFAltimas, \xFAltimo, \xFAltimos, um, uma, umas, uns, vendo, ver, vez, vindo, vir, vos, v\xF3s".split(", ");return e.split(" ").filter(r=>r&&s.every(o=>r.toLowerCase()!==o))}async searchArticleService(e){let s=this.cleanSearch(e),t=[],r=[];for(let c of s)t.push(await this.getArticlesByText(c)),t.push(await this.getArticlesByTitle(c)),t.push(await this.getArticlesBySubtitle(c));t.forEach(c=>{c.map(d=>r.push(d))});let o={};return r.filter(c=>o.hasOwnProperty(c.id)?!1:o={...o,[c.id]:!0})}}});var ds,ls,ke,U,me=L(()=>{"use strict";ue();ds=(f(),z(W)),ls=(p(),z(Q)),ke=new S,U=class{async index(e,s){let{content:t,author:r}=e.query,o=await ke.searchArticleService(t);s.json(o)}}});var fe=M((hs,pe)=>{"use strict";var de=require("express");me();var le=(0,de.Router)(),Ce=new U;le.get("/",Ce.index);pe.exports=le});var $=R(require("express"));p();var he=require("express");var se=require("express");f();var q=class{async checkUsersPermissionsForCreate(e){let s=await i("users").where({id:e}).first();return!!(s.hierarchy&&s.hierarchy!=="reader")}async checkUsersPermissionForEdit(e,s){return!!await i("articles").where({id:s}).andWhere({user_id:e}).first()}async createArticle({title:e,subtitle:s,text:t,user_id:r,image:o,author:n}){try{return await i("articles").insert({title:e,subtitle:s,text:t,user_id:r,image:o,author:n}),{message:"Success"}}catch(c){return{error:c}}}async updateArticle(e){if(!this.checkUsersPermissionForEdit(e.user_id,e.id))return{message:"forbidden"};try{await i("articles").where({id:e.id}).update(e)}catch(t){return{error:t}}return{message:"Success"}}async deleteArticle({user_id:e,article_id:s}){if(!await this.checkUsersPermissionForEdit(e,s))return{message:"forbidden"};try{return await i("articles").where({id:s}).delete(),{message:"OK"}}catch(r){return{error:r}}}async getAllArticles(){return await i("articles")}async getArticleById(e){return await i("articles").where({id:e}).first()}async getArticlesByUserId(e){return await i("articles").where({user_id:e})}};p();var l=new q,A=class{async create(e,s){let{title:t,subtitle:r,text:o,user_id:n,image:c,author:d}=e.body;if(!await l.checkUsersPermissionsForCreate(n))return s.json({message:"Sem Permiss\xE3o",error:"forbidden"});let G=await l.createArticle({title:t,subtitle:r,text:o,user_id:n,image:c,author:d});return s.json(G)}async update(e,s){let{title:t,subtitle:r,text:o,id:n,user_id:c,image:d}=e.body,B=await l.updateArticle({title:t,subtitle:r,text:o,id:n,image:d,user_id:c});return s.json(B)}async delete(e,s){let{user_id:t,article_id:r}=e.body,o=await l.deleteArticle({article_id:r,user_id:t});return s.json(o)}async index(e,s){let t=await l.getAllArticles();s.json(t)}async show(e,s){let{id:t}=e.query,{user_id:r}=e.query;if(t){let o=await l.getArticleById(t);return o||s.send(new u("Esse Artigo n\xE3o existe ou foi excluido","not_found",404)),s.json(o)}else if(r){let o=await l.getArticlesByUserId(r);return o||s.send(new u("Esse Artigo n\xE3o existe ou foi excluido","not_found",404)),s.json(o)}else{let{user_id:o}=e.body;if(o){let n=await l.getArticlesByUserId(o);return n||s.send(new u("Esse Artigo n\xE3o existe ou foi excluido","not_found",404)),s.json(n)}return s.send(new u("Sem Par\xE2metros","not_found",404))}}};var ee=require("jsonwebtoken");var N={jwt:{secret:"default",expiresIn:"1d"}};async function m(a,e,s){let t=a.headers.authorization;if(t){let[,r]=t.split(" ");if(!r)return s();try{let{sub:o}=(0,ee.verify)(r,N.jwt.secret);return a.body={...a.body,token:r,user_id:Number(o)},s()}catch{return e.json({redirect:!0,message:"Token expired or invalid"})}}return s()}p();function x(a,e,s){let{user_id:t}=a.body;t||e.send(new u({redirect:!0,error:"User not logged in"},"not logged in")),s()}var h=(0,se.Router)(),g=new A;h.post("/create",m,x,g.create);h.put("/update",m,x,g.update);h.delete("/delete",m,x,g.delete);h.get("/show",g.show);h.get("/show/user",m,g.show);h.get("/show-all",g.index);var te=h;var re=require("express");f();var v=class{async createComment({user_id:e,article_id:s,title:t,text:r,name:o}){try{o||(o=await(await i("users").where({id:e}).first()).name),await i("comments").insert({user_id:e,article_id:s,title:t,text:r,name:o})}catch(n){return{error:n}}return{message:"OK"}}async deleteComment({comments_id:e,article_id:s,user_id:t}){try{return await i("comments").where({id:e}).andWhere({article_id:s}).andWhere({user_id:t}).delete(),{message:"Success"}}catch(r){return{error:r}}}async getAllComments(e){try{return await i("comments").where({article_id:e})}catch(s){return s}}async getCommentById(e){try{return await i("comments").where({id:e}).first()}catch(s){return s}}async getCommentByUserId(e){try{return await i("comments").where({user_id:e})}catch(s){return s}}};p();var b=new v,k=class{async create(e,s){let{user_id:t,article_id:r,title:o,text:n,name:c}=e.body,d=await b.createComment({user_id:t,article_id:r,title:o,text:n,name:c});return s.json(d)}async index(e,s){let{article_id:t}=e.query,r=await b.getAllComments(t);return s.json(r)}async delete(e,s){let{comments_id:t,article_id:r,user_id:o}=e.body;if(!t)return s.json(new u("Coment\xE1rio Inexistente ou Exclu\xEDdo","not_found",404));let n=await b.deleteComment({comments_id:t,article_id:r,user_id:o});return s.json(n)}async show(e,s){let{id:t}=e.query;if(t){let n=await b.getCommentById(t);return s.json(n)}let{user_id:r}=e.body,o=await b.getCommentByUserId(r);return s.json(o)}};var w=(0,re.Router)(),C=new k;w.post("/create",m,C.create);w.delete("/delete",m,C.delete);w.get("/all",C.index);w.get("/show",C.show);w.get("/show/user",m,C.show);var oe=w;var ie=require("express");var ne=require("bcryptjs");var _=require("bcryptjs"),ae=require("jsonwebtoken");f();var Ze=(f(),z(W)),O=class{constructor(){}async login(e){let{user_id:s,token:t,email:r,password:o}=e;if(s&&t){let I=await i("users").where({id:s}).first();return{token:t,user_id:I.user_id,name:I.name,avatar:I.avatar,hierarchy:I.hierarchy}}if(!r&&!o)return{error:"login failed",message:"Sem dados",redirect:!0};let n=await i("users").where({email:r}).first();if(!n)return{error:"login failed",message:"Dados incorretos"};if(!(0,_.compare)(o,n.password))return{error:"login failed",message:"Dados incorretos"};let{secret:d,expiresIn:B}=N.jwt;return{token:(0,ae.sign)({},d,{subject:String(n.id),expiresIn:B}),user_id:n.id,name:n.name,avatar:n.avatar,hierarchy:n.hierarchy}}async register(e){let{name:s,email:t,password:r}=e;if(await i("users").where({email:t}).first())return{error:"register failed",message:"Email Existente"};try{let n={name:s,email:t,avatar:null,password:r,hierarchy:"reader"};return await i("users").insert(n),{message:"OK"}}catch(n){return{error:n,message:"CRUD"}}}async changePassword(e){let{user_id:s,oldPassword:t,newPassword:r}=e,o=await(await i("users").where({id:s}).first()).password;if(await(0,_.compare)(t,o))return{error:"update-password failed",message:"Senha Incorreta"};let c=await(0,_.hash)(r,8);try{await i("users").where({id:s}).update({password:c})}catch(d){return{error:d,message:"CRUD"}}return{message:"Senha alterada com sucesso"}}async changeAvatar(e){let{user_id:s,avatar:t}=e;try{await i("users").where({id:s}).update({avatar:t})}catch(r){return{error:r,message:"CRUD"}}return{message:"OK"}}async getAuthor(e){try{let s=await i("users").where({id:e}).first();return s?{id:s.id,name:s.name,avatar:s.avatar}:{error:"user not_found",message:"Usu\xE1rio n\xE3o encontrado"}}catch(s){return{error:s,message:"Server Error"}}}};p();var j=new O,P=class{async login(e,s){let{token:t,user_id:r,email:o,password:n}=e.body,c=await j.login({token:t,user_id:r,email:o,password:n});return s.json(c)}async create(e,s){let{name:t,email:r,password:o}=e.body,n=await(0,ne.hash)(o,8),c=await j.register({name:t,email:r,password:n});return s.json(c)}async update(e,s){let{user_id:t,avatar:r,newPassword:o,oldPassword:n}=e.body;if(!t)throw new u("Sem Dados","redirect",401,"/login");if(r){let c=await j.changeAvatar({user_id:t,avatar:r});return s.json({message:c})}else if(o){let c=await j.changePassword({user_id:t,newPassword:o,oldPassword:n});return s.json({message:c})}else throw new u("Sem Dados","redirect",401,"/login")}async getAuthor(e,s){let{id:t}=e.query;if(!t)throw new u("Sem Dados");let r=await j.getAuthor(t);return s.json(r)}};var y=(0,ie.Router)(),E=new P;y.post("/login",m,E.login);y.post("/register",E.create);y.put("/avatar",m,E.update);y.put("/change-password",m,E.update);y.get("/author",E.getAuthor);var ce=y;var D=(0,he.Router)(),_e=fe();D.use("/users",ce);D.use("/comments",oe);D.use("/articles",te);D.use("/search",_e);var ge=D;var ye=R(require("cors"));require("express-async-errors");var F=(0,$.default)();F.use((0,ye.default)());F.use($.default.json({limit:"10mb"}));F.use(ge);F.use(async(a,e,s,t)=>a instanceof u?s.status(a.status).json({status:"error",message:a.message,typeError:a.typeError}):s.status(500).json({status:"error",message:"erro do servidor"}));var we=process.env.PORT||3001;F.listen(we,()=>console.log("Server is Running:",we));
