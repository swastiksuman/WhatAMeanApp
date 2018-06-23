import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
})
export class PostListComponent implements OnInit, OnDestroy{
  private posts: Post[] =[];
  private postsSub: Subscription;
  constructor(public postsService: PostsService){
  }

  ngOnInit(){
    this.posts = this.postsService.getPost();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((p) => {
      this.posts = p;
    }
  );
  }
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }
}
