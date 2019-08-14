import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {News} from '../beans/news';
import { Observable, ObservableLike } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class NewsService {

 private theNews: Observable<News[]>;

 constructor(private http: HttpClient) {}

 getNews = (): Observable<News[]> => {
  // USE HTTP SERVICE INSTEADs
  return this.theNews;
 }

 addLike(news: News) {
 // ADD LIKE ON SERVER AND UPDATE CLIENT ON SUCCESS
 }

 deleteNews(news: News): Observable<News>  {
  // SEND DELETE TO THE SERVER
  // AND UPDATE YOUR LOCAL NEWS ON SUCCESS
  let ret: Observable<News>;
  return ret;
 }

 addNews(news: News): Observable<News> {
  // POST THE NEWS TO ADD ON SERVER SIDE (use headers to do that )
  // THE SERVER ANSWERS WITH THE ADDED NEWS, USE THIS ANSWER TO
  // ADD THE NEWS TO THE EXSITING LIST OF NEWS
  let ret: Observable<News>;
  return ret;
 }

 randomNews = (): Observable<News> => {
  let ret: Observable<News>;
  return ret;
 }
}
