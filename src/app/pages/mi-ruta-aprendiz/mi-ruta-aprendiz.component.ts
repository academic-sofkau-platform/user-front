import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table'
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-mi-ruta-aprendiz',
  templateUrl: './mi-ruta-aprendiz.component.html',
  styleUrls: ['./mi-ruta-aprendiz.component.css']
})
export class MiRutaAprendizComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['curso', 'prerrequisito'];
  cursosId:string = ""
  nombreCurso:string = ""

  constructor( public api: ApiService ) { }

  ngOnInit() {
    this.api.getAllTrainingsActivos().subscribe((elements)=> {
    this.cursosId = elements.map((dato) => dato.apprentices.filter((dato:any) => dato.email == 'lauratatis379@gmail.com'))[0][0].tareas

    console.log(this.cursosId)
      
    })
   
  }

}
