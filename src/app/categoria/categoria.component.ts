import { Component, OnInit } from '@angular/core';
import { Post } from '../interfaces/post';
import { Categoria, DatosPostsService } from '../services/datos-posts.service';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  arrayMostrado: Post[];
  arrayCategorias: Categoria[]
  categoriaMostrada: Categoria;


  constructor(private datosPostsService: DatosPostsService) {
    this.categoriaMostrada = null;

    this.arrayCategorias = this.datosPostsService.arrayCategorias;
  }

  ngOnInit(): void {

    this.datosPostsService.getAllPosts()
      .then(response => {
        this.arrayMostrado = response;


      })
      .catch(error => console.log(error));
  }

  async filtrarCategoria(pCategoria) {
    if (pCategoria) {
      this.arrayMostrado = await this.datosPostsService.getPostByCategory(pCategoria)
      this.categoriaMostrada = pCategoria;
    } else {
      this.arrayMostrado = await this.datosPostsService.getAllPosts();
      this.categoriaMostrada = null;
    }
  }

}
