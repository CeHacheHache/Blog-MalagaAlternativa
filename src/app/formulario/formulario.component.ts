import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../interfaces/post';
import { Categoria, DatosPostsService } from '../services/datos-posts.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  formulario: FormGroup;
  categorias: Categoria[];
  postPublicado: string;
  editMode: Boolean;
  editPost: Post;
  editPostIndex: number;

  constructor(private datosPostsService: DatosPostsService) {

    this.categorias = this.datosPostsService.arrayCategorias;
    this.editMode = this.datosPostsService.editMode; 

    //carga el formulario de cero con los validadores de cada campo
    if (!this.editMode) {

      this.formulario = new FormGroup({
        titulo: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ]),
        texto: new FormControl('', [
          Validators.required,
          Validators.minLength(15)
        ]),
        autor: new FormControl(''),
        imagen: new FormControl('', [
          Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
        ]),
        categoria: new FormControl('', [
          Validators.required
        ]),

      });
    } else {

      //incluye los campos para ser modificados y vuelven a pasarse los validadores
      this.datosPostsService.getPostEdit().then(resovle => {
        this.editPost = resovle 

        this.editPostIndex = (this.editPost.id - 1); 


        this.formulario = new FormGroup({
          titulo: new FormControl(this.editPost.titulo, [
            Validators.required,
            Validators.minLength(2)
          ]),
          texto: new FormControl(this.editPost.texto, [
            Validators.required,
            Validators.minLength(10)
          ]),
          autor: new FormControl({ value: this.editPost.autor, disabled: true }),
          imagen: new FormControl(this.editPost.imagen, [
            Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
          ]),
          categoria: new FormControl(this.editPost.categoria, [
            Validators.required
          ]),

        });
      });

    }

  }

  ngOnInit(): void {
  }

  async onSubmit(newPost: Post) {
    //si el campo de la imagen esta vacio carga la de este link
    if (!newPost.imagen) newPost.imagen = 'https://blog.fuertehoteles.com/wp-content/uploads/2018/09/centro-pompidou-malaga-2.jpg'

    
    if (this.editMode) {
      newPost.autor = this.editPost.autor;
      newPost.id = this.editPostIndex + 1;
      newPost.fecha = this.editPost.fecha;
     
      const response = await this.datosPostsService.modifyPost(newPost, this.editPostIndex);
      this.postPublicado = response;
      this.formulario.reset();
      this.datosPostsService.editMode = false;

    } else {
      //guarda Anonimo por defecto
      if (!newPost.autor) newPost.autor = 'Anonymous'
      //guarda la fecha actual y el id nuevo
      newPost.id = await this.datosPostsService.getNewPostId();
      newPost.fecha = new Date();
      //hace que se añada el post al servicio y se resetea el formulario
      this.postPublicado = await this.datosPostsService.addNewPost(newPost);
      this.formulario.reset()
    }
    //borra el mensaje cuando se guarda el post
    setTimeout(() => {
      this.postPublicado = null;
    }, 4000);


  }

}
