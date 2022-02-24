import { Component, OnInit } from '@angular/core';
import { DatosPostsService } from '../services/datos-posts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private datosPostaService: DatosPostsService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.datosPostaService.editMode = false;
  }

}
