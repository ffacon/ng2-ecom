import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {News} from '../beans/news';

@Injectable()
export class NewsService{

	private theNews: Promise<News[]>;

	constructor(private http: Http){}

	getNews= (): Promise<News[]> => {

		//USE HTTP SERVICE INSTEADs
		return this.theNews;
	}

	addLike= (news: News) => {
		//ADD LIKE ON SERVER AND UPDATE CLIENT ON SUCCESS
	}

	deleteNews= (news: News) => {

		//SEND DELETE TO THE SERVER
		//AND UPDATE YOUR LOCAL NEWS ON SUCCESS
		return new Promise<News>( (resolve, reject) => resolve() );
	}

	addNews= (news: News) => {

		//POST THE NEWS TO ADD ON SERVER SIDE (use headers to do that )
		//THE SERVER ANSWERS WITH THE ADDED NEWS, USE THIS ANSWER TO
		//ADD THE NEWS TO THE EXSITING LIST OF NEWS
		return new Promise<News>( (resolve, reject) => resolve() );

	}

	randomNews= (): Promise<News> => {

		return new Promise<News>( (resolve, reject) => resolve({}) );
	}
}