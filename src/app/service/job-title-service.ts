import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
import { IJobTitle } from "../types/job-title";


@Injectable({
    providedIn: 'root'
})

export default class JobTitleService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    ASPbaseUrl = 'http://localhost:5296'

    getList(): Observable<IJobTitle[]> {
        return this.http.get<IJobTitle[]>(`${this.ASPbaseUrl}/job-title`)
            .pipe(
                catchError((error) => throwError(() => new Error(error)))
            )
    }

    create(jobTitle: IJobTitle): Observable<IJobTitle> {
        return this.http.post<IJobTitle>(`${this.ASPbaseUrl}/job-title/create`, jobTitle, this.httpOptions).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
    }

    update(jobTitle: IJobTitle): Observable<IJobTitle> {
        return this.http.patch<IJobTitle>(`${this.ASPbaseUrl}/job-title/update`, jobTitle, this.httpOptions).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
      }
    

    delete(id: string): Observable<any> {
        return this.http.delete<IJobTitle>(`${this.ASPbaseUrl}/job-title/delete`, {...this.httpOptions, body: {id: id}}).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
      }
}