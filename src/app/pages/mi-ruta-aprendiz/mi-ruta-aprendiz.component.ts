import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table'

@Component({
  selector: 'app-mi-ruta-aprendiz',
  templateUrl: './mi-ruta-aprendiz.component.html',
  styleUrls: ['./mi-ruta-aprendiz.component.css']
})
export class MiRutaAprendizComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['curso', 'prerrequisito', 'nivel', 'acciones'];

  constructor() { }

  ngOnInit() {
    this.dataSource= new MatTableDataSource(["1","2","3"])
  }

}
