import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AddRutaCommand } from '../commands/addRutaCommand';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllTrainingsActivos(): Observable<any[]> {
    return this.http.get<any[]> (environment.apiBase + '/trainings/findAllTrainingActivos');
  }

  getAllCursos(): Observable<any[]> {
    return this.http.get<any[]> (environment.apiBase + '/curso');
  }

  getAllRutasAprendizaje(): Observable<any[]> {
    return this.http.get<any[]> (environment.apiBase + '/rutaAprendizaje/findAll')
  }

  addTarea(trainingId:string, email:string, command:AddRutaCommand) {
    return this.http.post(environment.apiBase + '/trainings/addtarea/' + trainingId + '/' + email , command)
  }

}
