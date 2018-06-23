import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from "@angular/forms";
import { PostsService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent{
  postTitle = '';
  postContent = '';
  @Output() postCreated = new EventEmitter();

constructor(public postsService: PostsService){

}

  doSomething(postInput: HTMLTextAreaElement){
    const post: Post = {
      title: this.postTitle,
      content: this.postContent
    };
    this.postCreated.emit(post);
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postsService.addPost(form.value.postTitle, form.value.postContent);
    form.resetForm();
  }
}
