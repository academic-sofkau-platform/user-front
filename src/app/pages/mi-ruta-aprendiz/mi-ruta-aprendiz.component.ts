import { Component,ViewChild ,OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table'
import { ApiService } from 'src/app/shared/services/api.service';
import { elementAt } from 'rxjs';
import { ResultadoDelCursoComponent } from '../resultado-del-curso/resultado-del-curso.component';


@Component({
  selector: 'app-mi-ruta-aprendiz',
  templateUrl: './mi-ruta-aprendiz.component.html',
  styleUrls: ['./mi-ruta-aprendiz.component.css']
})
export class MiRutaAprendizComponent implements OnInit {

  

  dataSource: any;
  displayedColumns: string[] = ['curso', 'prerrequisito', 'nivel', 'accion'];
  tareas:any
  rutas:any
  cursoId:any
  email:string = ""
  trainingNombre:any
  cursoNombres:[] = []
  cursoPrerrequisito:[] = []
  cursoNivel:[] = []
  object:any
  rutaAprendizajeId:any
  data:any = []
  source:any = []
  

  constructor( public api: ApiService ) { }

  ngOnInit() {

   this.ObtenerNombreCurso()
   this.ObtenerPrerrequisitosyNivel()

   setTimeout(() => {

    for (var i = 0; i < this.cursoNombres.length; i++) {
     this.data.nombre =  this.cursoNombres[i]
     this.data.nivel = this.cursoNivel[i]
     this.data.prerrequisito = this.cursoPrerrequisito[i]
     this.source.push([{
      nombre:this.data.nombre,
      nivel:this.data.nivel,
      prerrequisito:this.data.prerrequisito
    }])
   }
  
    this.dataSource = this.source.flatMap((dato:any) => dato)
   }, 700);
  
  
  }

  ObtenerNombreCurso() {
    this.api.getAllTrainingsActivos().subscribe((elements) => {
      //Traigo los Id de los cursos del aprendiz

//el email se cambiaría por el usuario conectado 

    this.tareas = elements.map((dato) => dato.apprentices.filter((dato:any) => dato.email == 'lauratatis3791@gmail.com'))[0][0].tareas.flatMap((dato: any) => dato.cursoId)
    
    //Traigo el nombre del training
      this.trainingNombre = elements.filter((dato) => dato.apprentices.map((datos:any) => datos.email == 'lauratatis3791@gmail.com'))[0].name
      this.email = elements.map((dato) => dato.apprentices.filter((dato:any) => dato.email == 'lauratatis3791@gmail.com'))[0][0].email
    })

      setTimeout(() => {

         //llamo a todos los cursos para obtener el nombre
      this.api.getAllCursos().subscribe((elements) => {
      let tareas = this.tareas
      let nombres:any = []
     
      //Comparo los id para obtener los nombres
      elements.filter(function(elemento:any) {
        tareas.map((dato:any) => {
          if(dato == elemento.id) {
            nombres.push(elemento.nombre)
          }
        })
      })
      this.cursoNombres = nombres
      })

    },200);
    
  }


  ObtenerPrerrequisitosyNivel() {
    this.api.getAllTrainingsActivos().subscribe((elements) => {
      let rutaAprendizaje:any
      let nivel:any = []
      let prerrequisito:any = []

      //Traigo el Id de la ruta de aprendizaje del aprendiz
   
     this.rutaAprendizajeId = elements.map((dato) => dato.rutaAprendizajeId)
     this.rutaAprendizajeId = '6328d23016b54139e3aa3988'

      //Tengo que igualar el dato.id con el Id de la ruta de aprendizaje del aprendiz
     this.api.getAllRutasAprendizaje().subscribe((elements) => {
       rutaAprendizaje = elements.filter((dato) => dato.id == '6328d23016b54139e3aa3988') 
      })

      setTimeout(() => {
        let ids = this.tareas

      rutaAprendizaje.map((dato:any) => dato.rutas).flatMap((rutas:any) => rutas).filter(function(elemento:any) { 
        ids.map((dato:any) => { 
          if( dato == elemento.cursoId) {
           nivel.push(elemento.nivel)
           prerrequisito.push(elemento.prerrequisitos) 
          }
        })
      })
      this.cursoNivel = nivel
      this.cursoPrerrequisito = prerrequisito
      }, 200);
     
    })
  }
  

}
