import { Component,OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-mi-ruta-aprendiz',
  templateUrl: './mi-ruta-aprendiz.component.html',
  styleUrls: ['./mi-ruta-aprendiz.component.css']
})
export class MiRutaAprendizComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['curso', 'prerrequisito', 'nivel', 'accion'];
  trainingNombre: string = ""
  trainingId: string = ""
  rutaAprendizajeId: string = ""
  
  constructor( public api: ApiService, private auth:AuthService ) {   }

  ngOnInit() {
   this.api.getRutaAprendiz(this.auth.user.email).subscribe((elements) => {
    this.trainingNombre = elements[0].nombreTraining
    this.trainingId = elements[0].trainingId
    this.dataSource = elements
    console.log(elements)
   })


  }


}
