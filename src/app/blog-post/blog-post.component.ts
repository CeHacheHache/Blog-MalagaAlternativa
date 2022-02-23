import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../interfaces/post';
import { DatosPostsService } from '../services/datos-posts.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  postMostrado: Post;
  postId: number;
  parrafosPost: string[];

  constructor(
    private datosPostsService: DatosPostsService,
    private activatedRoute: ActivatedRoute) {

    this.postMostrado = {};
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.postId = parseInt(params.blogId);
    });

    this.datosPostsService.getPostById(this.postId)
      .then(response => {
        this.postMostrado = response;
        this.parrafosPost = this.postMostrado.texto.split('\n').filter(element => element.trim() != '');

      })
      .catch(error => console.log(error));

  }



}
