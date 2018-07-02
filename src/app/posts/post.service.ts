import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

@Injectable({providedIn: 'root'})
export class PostsService{
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {  }

  getPosts() {
    return this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts').pipe(map((postData) => {
      return postData.posts.map( post => {
        return {
          title: post.title,
          content: post.content,
          id: post.id
        };
      });
    })).subscribe((transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = {id: 'asdad123', title: title, content: content};
    console.log('Add Post');
    this.http.post('http://localhost:3000/api/posts', post).subscribe((responseData) => {
      console.log(responseData);
    }
    );
  }

  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId).subscribe( () => {
      console.log('ID: ' + postId + ' deleted.');
    });
  }
}
