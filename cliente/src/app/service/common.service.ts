import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Post } from '../_models/post.model';

@Injectable()
export class CommonService {
  public postAdded_Observable = new Subject();
  public postEdit_Observable = new Subject();
  public post_to_be_edited;
  private mensaje: Post;
  sendMessage(post: Post) {
    this.mensaje = post;
  }
  getMessage(): Post {
    return this.mensaje;
  }
  constructor() {
    this.post_to_be_edited = new Post();
  }

  notifyPostEdit() {
    this.postEdit_Observable.next();
  }

  setPostToEdit(post: Post) {
    this.post_to_be_edited = post;
    this.notifyPostEdit();
  }

  notifyPostAddition() {
    this.postAdded_Observable.next();
  }
}
