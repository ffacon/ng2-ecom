import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {News} from '../beans/news';
import { Observable, ObservableLike } from 'rxjs';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import { tap, catchError } from 'rxjs/operators';

const postOptions={
	headers:new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
  })
export class NewsService{

	private theNews: Observable<News[]>;
	private handleError: HandleError;
	readonly newsUrl : string ='/api/app/news';

	constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler){
		this.handleError = httpErrorHandler.createHandleError('NewsService');}

	getNews= (): Observable<News[]> => {

		this.theNews = this.http.get<News[]>(this.newsUrl);
		return this.theNews;
	}

	addLike(news: News) : Observable<News>  {
		return this.http.post<News>(this.newsUrl + '/like/' + news.id,"")
		.pipe(
				tap((res :News) => { news.likes =res.likes} ),
			  	catchError(this.handleError<News>('addLike'))
			  );
	}

	deleteNews(news: News) : Observable<News>  {
		const url = `${this.newsUrl}/${news.id}`;
		return this.http.delete<News>(url,postOptions);
		
	}

	addNews(news: News) : Observable<News> {

		return this.http.post<News>(this.newsUrl, news,postOptions);

	}

	randomNews= (): Observable<News> => {
		return this.http.get<News>(this.newsUrl + '/random');
	}
}