import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-resultado-del-curso',
  templateUrl: './resultado-del-curso.component.html',
  styleUrls: ['./resultado-del-curso.component.css']
})
export class ResultadoDelCursoComponent implements OnInit {
  nombre:string = ""
  miCurso:any
  consigna:string = ""

  constructor(private route:ActivatedRoute ,public api: ApiService) { }

  ngOnInit() {
    this.nombre = this.route.snapshot.params['id']
    this.obtenerConsigna()

  }

  obtenerConsigna() {
    this.api.getAllCursos().subscribe((elements) => {
      this.miCurso = elements.filter((dato) => dato.nombre == this.nombre)
      this.consigna = this.miCurso.consigna
      console.log(elements)
    })
  }

}
