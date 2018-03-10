import {Injectable} from '@angular/core';

import { catchError, tap } from 'rxjs/operators'
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/toPromise';

import {News} from '../beans/news';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


const postOptions={
	headers:new HttpHeaders({
		'Content-Type': 'application/json'
	})
};
@Injectable()
export class NewsService{

	private theNews: Promise<News[]>;
	readonly newsUrl : string ='/api/app/news';
	constructor(private http: HttpClient){}

	getNews= (): Promise<News[]> => {
		this.theNews = this.http.get<News[]>(this.newsUrl).toPromise();
		return this.theNews;
	}

	//import { catchError, tap } from 'rxjs/operators'
    //import { of } from 'rxjs/observable/of';
	addLike= (news: News) : Observable<News> => {
		return this.http.post<News>(this.newsUrl + '/like/' + news.id,"")
		.pipe(
				tap((res :News) => { news.likes =res.likes} ),
			  	catchError(this.handleError<News>('addLike'))
			  );
		//.toPromise().then((res :News) => news.likes =res.likes);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.log(error); 
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

	deleteNews= (news: News) => {

		const url = `${this.newsUrl}/${news.id}`;
		return this.http.delete<News>(url,postOptions)
		.pipe(
			catchError(this.handleError<News>('addLike'))	
			).toPromise();
		//return new Promise<News>( (resolve, reject) => resolve() );
	}

	addNews= (news: News) => {
		return  this.http.post<News>(this.newsUrl, news,postOptions)
				.toPromise();

	}

	randomNews= (): Promise<News> => {
		return this.http.get<News>(this.newsUrl + '/random').toPromise();
	}
}