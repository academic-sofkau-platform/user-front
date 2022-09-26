import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resultado-del-curso',
  templateUrl: './resultado-del-curso.component.html',
  styleUrls: ['./resultado-del-curso.component.css']
})
export class ResultadoDelCursoComponent implements OnInit {

  nombreCurso: string = ""
  email: string = ""
  cursoId: string = ""
  miCurso: any
  consigna: string = ""
  trainingId: string = ""
  entregado: boolean = false
  contenido: string = ""
  contenidoForm: FormGroup;


  constructor(private route: ActivatedRoute, public api: ApiService, private router: Router, private auth: AuthService) {
    this.contenidoForm = new FormGroup({
      contenido: new FormControl()
    })
  }

  ngOnInit() {
    this.nombreCurso = this.route.snapshot.params['nombre']
    this.email = this.auth.user.email
    this.trainingId = this.route.snapshot.params['trainingId']
    this.cursoId = this.route.snapshot.params['cursoId']
    this.obtenerConsigna()

  }

  obtenerConsigna() {
    this.api.getAllCursos().subscribe((elements) => {
      this.miCurso = elements.filter((dato) => dato.nombre == this.nombreCurso)[0]
      this.consigna = this.miCurso.consigna
    })
  }

  entregar() {
    this.api.updateTarea(this.trainingId, this.email, this.cursoId, {
      contenido: this.contenidoForm.value.contenido,
      entregado: true
    }).subscribe(elem => {
      console.log(elem)
    })
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      this.router.navigate(['mi-ruta'])
    }, 500)

  }

}
