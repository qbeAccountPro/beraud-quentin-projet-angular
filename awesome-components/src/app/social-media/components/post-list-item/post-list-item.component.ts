import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { CommentsComponent } from '../../../shared/components/comments/comments.component';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [TitleCasePipe, SharedModule, CommonModule, CommentsComponent],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss',
})
export class PostListItemComponent implements OnInit {

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();

  constructor() { }

  ngOnInit(): void { }

  onNewComment(comment: string) {
    this.postCommented.emit({ comment, postId: this.post.id }) 
    console.log(comment);
  }

}