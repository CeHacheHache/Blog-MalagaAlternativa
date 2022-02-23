import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListadoComponent } from './listado/listado.component';
import { CategoriaComponent } from './categoria/categoria.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "home", component: BlogComponent },
  { path: "home", component: BlogComponent },
  { path: "listado", component: ListadoComponent },
  { path: "categoria", component: CategoriaComponent },
  { path: "blog/:blogId", component: BlogPostComponent },
   { path: "categoria/:idCategoria", component: CategoriaComponent },
  { path: "new", component: FormularioComponent },
  { path: "admin", component: AdminComponent },
  { path: "**", redirectTo: "/blog" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
