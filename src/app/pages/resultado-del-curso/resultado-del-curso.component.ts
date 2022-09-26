import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-resultado-del-curso',
  templateUrl: './resultado-del-curso.component.html',
  styleUrls: ['./resultado-del-curso.component.css']
})
export class ResultadoDelCursoComponent implements OnInit {

  nombreCurso:string = ""
  email:string = ""
  miCurso:any
  consigna:string = ""
  trainingId:string = ""
  entregado:boolean = false
  contenido:string = ""
  contenidoForm: FormGroup;


  constructor(private route:ActivatedRoute ,public api: ApiService, private router:Router) {
    this.contenidoForm = new FormGroup({
      contenido: new FormControl()
     })
  }

  ngOnInit() {
    this.nombreCurso = this.route.snapshot.params['nombre']
    this.email = 'lauratatis3791@gmail.com'
    this.trainingId = this.route.snapshot.params['trainingId']
    this.obtenerConsigna()

  }

  obtenerConsigna() {
    this.api.getAllCursos().subscribe((elements) => {
      this.miCurso = elements.filter((dato) => dato.nombre == this.nombreCurso)[0]
      this.consigna = this.miCurso.consigna
    })
  }

  entregar() {

  }

}
