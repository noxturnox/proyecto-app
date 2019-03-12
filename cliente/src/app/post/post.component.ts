import { Component } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Post } from '../_models/post.model';
@Component({
    selector: 'post',
    templateUrl: 'post.component.html',
    styleUrls: ['post.component.css']
})
export class PostComponent { 
    message: Post;
    public message2: Post;
    constructor(private data: CommonService) {
       
    }
    ngOnInit() {
        this.message = this.data.getMessage();
        this.message2 = this.message;
    }
    
    
}