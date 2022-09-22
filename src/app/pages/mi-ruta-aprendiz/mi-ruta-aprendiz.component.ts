import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table'
import { ApiService } from 'src/app/shared/services/api.service';
import { elementAt } from 'rxjs';


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
   
   }, 1050);
  
  
  }

  ObtenerNombreCurso() {
    this.api.getAllTrainingsActivos().subscribe((elements) => {
      //Traigo los Id de los cursos del aprendiz

//el email se cambiaría por el usuario conectado 

      this.tareas = elements.map((dato) => dato.apprentices.filter((dato:any) => dato.email == 'lauratatis379@gmail.com'))[0][0].tareas.flatMap((dato: any) => dato.cursoId)
    })

    this.api.getAllRutasAprendizaje().subscribe((elements) => {
      //Traigo los id de los cursos en las rutas
      this.rutas = elements.map((dato) => dato.rutas).flatMap((rutas) => rutas).flatMap((id: any) => id.cursoId)
      
    })
  
    setTimeout(() => {
      //Obtengo los cursosId
      let rutas = this.rutas
      this.tareas.filter(function(tarea:any) {
        rutas.filter((dato:any) => dato == tarea)
      })
 
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
    }, 450);
    
  }


  ObtenerPrerrequisitosyNivel() {
    this.api.getAllTrainingsActivos().subscribe((elements) => {
      let rutaAprendizaje = elements
      let nivel:any = []
      let prerrequisito:any = []

      //Traigo los Id de la ruta de aprendizaje del aprendiz
     this.rutaAprendizajeId = elements.map((dato) => dato.rutaAprendizajeId)
     this.rutaAprendizajeId = '6324beccddc61d031accd915'

     this.api.getAllRutasAprendizaje().subscribe((elements) => {
       rutaAprendizaje = elements.filter((dato) => dato.id == '6324beccddc61d031accd915') 
      })

      setTimeout(() => {
        let ids = this.tareas
      rutaAprendizaje.map((dato) => dato.rutas).flatMap((rutas) => rutas).filter(function(elemento:any) {
        ids.map((dato:any) => {
          if( dato == elemento.cursoId) {
           nivel.push(elemento.nivel)
           prerrequisito.push(elemento.prerrequisitos) 
          }
        })
      })
      this.cursoNivel = nivel
      this.cursoPrerrequisito = prerrequisito
      }, 250);
     
    })
  }


  

}
