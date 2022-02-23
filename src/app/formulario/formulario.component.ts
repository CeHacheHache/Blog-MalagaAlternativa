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
    this.editMode = this.datosPostsService.editMode; //verifica si carga el modo edición o el modo normal

    //formulario en blanco para el modo normal
    if (!this.editMode) {

      this.formulario = new FormGroup({
        titulo: new FormControl('', [
          Validators.required,
          Validators.minLength(2)
        ]),
        texto: new FormControl('', [
          Validators.required,
          Validators.minLength(10)
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

      //Formulario con los datos del post a modificar y el campo autor deshabilitado en modo edición
      this.datosPostsService.getPostEdit().then(resovle => {
        this.editPost = resovle //recupera el post a editar

        this.editPostIndex = (this.editPost.id - 1); //recupera el Index en el array del post a editar


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
    //si el campo de imagen está vacio se aplica la imagen generica
    if (!newPost.imagen) newPost.imagen = 'https://wonderstays.com/wp-content/uploads/2019/05/Mejores-Museos-de-M%C3%A1laga.jpg'

    //si se encuentra en modo edicion se completan los datos que faltan del formulario, autor, id, fecha.
    if (this.editMode) {
      newPost.autor = this.editPost.autor;
      newPost.id = this.editPostIndex + 1;
      newPost.fecha = this.editPost.fecha;
      //se modifica el post en el servicio
      const response = await this.datosPostsService.modifyPost(newPost, this.editPostIndex);
      this.postPublicado = response;
      //se resetea el formulario y se apaga el modo edicion
      this.formulario.reset();
      this.datosPostsService.editMode = false;

    } else {
      //si el campo autor está vacio, se utiliza Anonymous como autor
      if (!newPost.autor) newPost.autor = 'Anonymous'
      //se genera un uevo id para el post y se le registra la fecha
      newPost.id = await this.datosPostsService.getNewPostId();
      newPost.fecha = new Date();
      //se agrega el nuevo post al servicio
      this.postPublicado = await this.datosPostsService.addNewPost(newPost);
      this.formulario.reset()
    }
    //setTimeout para borrar automaticamente la alerta de post guardado
    setTimeout(() => {
      this.postPublicado = null;
    }, 4000);


  }

}
