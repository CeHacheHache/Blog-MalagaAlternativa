import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListadoComponent } from './listado/listado.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  { path: "blog", component: BlogComponent },
  { path: "home", component: BlogComponent },
  { path: "listado", component: ListadoComponent },
  { path: "blog/:blogId", component: BlogPostComponent },
  { path: "new", component: FormularioComponent },
  { path: "admin", component: AdminComponent },
  { path: "**", redirectTo: "/blog" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
