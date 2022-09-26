import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdateTareaCommand } from '../commands/updateTareaCommand';



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

  getRutaAprendiz(email:string): Observable<any[]> {
    return this.http.get<any[]> (environment.apiBase + '/rutaAprendizaje/getRutaAprendiz/' + email)
  }
  
  updateTarea(trainingId:string, email:string, cursoId:string, command:UpdateTareaCommand) {
    return this.http.post(environment.apiBase + '/trainings/updateTarea/' + trainingId + '/' + email + '/' + cursoId , command)
  }



}
