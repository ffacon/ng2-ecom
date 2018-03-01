import {Comment} from './comment';
export interface Book {
    id: number,
	name: string,
	author: string,
	price: number,
	description: string,
	category: string,
	isNew: boolean,
	comments: Comment[]
	rating?: number
}
