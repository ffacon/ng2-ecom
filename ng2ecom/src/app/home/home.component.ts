import { Component, OnInit } from '@angular/core';

import {NewsService} from '../services/news.service';
import {News} from '../beans/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers: [NewsService]

})
export class HomeComponent implements OnInit {

  message: string = 'Welcome in our shop!!!';
	news: News[];
	newsOfTheDay: News= {};
	nextNews: News = {};


	constructor(private newsService: NewsService) {}

	ngOnInit(){
		this.updateNews();
	}

	updateNews= () => {
		this.newsService
			.getNews()
			.then((news: News[]) => {
				this.news = news;
			});

		this.newsService.randomNews()
			.then((news: News) => {
				this.newsOfTheDay = news;
			});
	}

	addLike= (news: News) => {
		this.newsService.addLike(news);
	}

	deleteNews= (news: News) => {
		this.newsService.deleteNews(news)
			.then(() => this.updateNews());
	}

	addNews= () => {
		this.newsService.addNews(this.nextNews)
		.then((addedNews: News) => this.news.push(addedNews) );
	}


}