import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllTrainingsActivos(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiBase + '/trainings/findAllTrainingActivos');
  }

}
