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

message = 'Welcome in our shop!!!';
news: News[];
newsOfTheDay: News = {};
nextNews: News = {};


constructor(private newsService: NewsService) {}

ngOnInit() {
 this.updateNews();
}

updateNews = () => {
 this.newsService.getNews().subscribe((news: News[]) => {
    this.news = news;
  });

 this.newsService.randomNews().subscribe((news: News) => {
  this.newsOfTheDay = news;
  });
}

addLike = (news: News) => {
 this.newsService.addLike(news).subscribe(
 (newsUpdated: News) => console.log('sucess add like', newsUpdated), // sucess
 (error) => console.error(error) // error
 );
}

deleteNews = (news: News) => {
 this.newsService.deleteNews(news).subscribe(() => this.updateNews());
}

 addNews = () => {
  this.newsService.addNews(this.nextNews).subscribe(
  (addedNews: News) => this.news.push(addedNews)
 );
}


}