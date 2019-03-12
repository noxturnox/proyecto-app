import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShowPostService {

	constructor(private http: HttpClient){
			
	}
	
	getAllPost(){
		return this.http.post('/api/post/getAllPost',{})
	}

	deletePost(id){
		return this.http.post('/api/post/deletePost',{id : id})
	}

}