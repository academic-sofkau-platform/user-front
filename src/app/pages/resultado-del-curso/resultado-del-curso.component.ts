import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultado-del-curso',
  templateUrl: './resultado-del-curso.component.html',
  styleUrls: ['./resultado-del-curso.component.css']
})
export class ResultadoDelCursoComponent implements OnInit {

  @Output() entregadoEvent = new EventEmitter<boolean>();

  nombre:string = ""
  miCurso:any
  consigna:string = ""
  entregado:boolean = false

  constructor(private route:ActivatedRoute ,public api: ApiService, private router:Router) { }

  ngOnInit() {
    this.nombre = this.route.snapshot.params['id']
    this.obtenerConsigna()

  }

  obtenerConsigna() {
    this.api.getAllCursos().subscribe((elements) => {
      this.miCurso = elements.filter((dato) => dato.nombre == this.nombre)[0]
      this.consigna = this.miCurso.consigna
    })
  }

  entregar() {
    this.entregado = true
    this.router.navigate(['/mi-ruta'])
    this.entregadoEvent.emit(this.entregado)
  }

}
