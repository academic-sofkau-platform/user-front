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
    this.nombreCurso = this.route.snapshot.params['id']
    this.obtenerConsigna()
    this.obtenerTrainingId()

  }

  obtenerConsigna() {
    this.api.getAllCursos().subscribe((elements) => {
      this.miCurso = elements.filter((dato) => dato.nombre == this.nombreCurso)[0]
      this.consigna = this.miCurso.consigna
    })
  }

  obtenerTrainingId() {
    this.api.getAllTrainingsActivos().subscribe((elements) => {
    this.trainingId = elements.filter((dato) => dato.name == this.route.snapshot.params['training']).map((dato:any) => dato.trainingId)[0]
    })
  }

  entregar() {
    this.api.addTarea(this.trainingId,this.route.snapshot.params['email'], {
      contenido: this.contenidoForm.value.contenido,
      entregado: true
    }).subscribe()
  }

}
