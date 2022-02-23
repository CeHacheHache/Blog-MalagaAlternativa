import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { Categoria, DatosPostsService } from '../services/datos-posts.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  arrayMostrado: Post[];
  arrayCategorias: Categoria[]
  categoriaMostrada: Categoria;
  idCategoria: string;
  categoriaSelect: Categoria


  constructor(
    private datosPostsService: DatosPostsService,
    private activatedRoute: ActivatedRoute){
    
    this.categoriaMostrada = null;
    this.arrayCategorias = this.datosPostsService.arrayCategorias;
    this.categoriaSelect = undefined;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.categoriaSelect = params.pCategoria;
    });

    this.datosPostsService.getAllPosts()
      .then(response => {
        this.arrayMostrado = response;

      });
    
      

  }
  

  async filtrarCategoria(pCategoria) {
      if (pCategoria) {
        this.arrayMostrado = await this.datosPostsService.getPostByCategory(pCategoria)
        this.categoriaMostrada = pCategoria;
        this.idCategoria = pCategoria;
      } else {
        this.arrayMostrado = await this.datosPostsService.getAllPosts();
        this.categoriaMostrada = null;
        this.idCategoria = null;
      }
    }

  }
