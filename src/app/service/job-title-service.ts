import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
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

    baseUrl= 'http://localhost:9000'
    ASPbaseUrl = 'http://localhost:5296'

    getList(): Observable<IJobTitle[]> {
        return this.http.get<IJobTitle[]>(`${this.ASPbaseUrl}/job-title`)
            .pipe(
                catchError(this.handleError<IJobTitle[]>('getList', []))
            )
    }

    create(jobTitle: IJobTitle): Observable<IJobTitle> {
        return this.http.post<IJobTitle>(`${this.ASPbaseUrl}/job-title/create`, jobTitle, this.httpOptions).pipe(
            catchError(this.handleError<IJobTitle>('create'))
        );
    }

    update(jobTitle: IJobTitle): Observable<IJobTitle> {
        return this.http.patch<IJobTitle>(`${this.ASPbaseUrl}/job-title/update`, jobTitle, this.httpOptions).pipe(
          catchError(this.handleError<any>('update'))
        );
      }
    

    delete(id: string): Observable<IJobTitle> {
        return this.http.delete<IJobTitle>(`${this.ASPbaseUrl}/job-title/delete`, {...this.httpOptions, body: {id: id}}).pipe(
          catchError(this.handleError<IJobTitle>('delete'))
        );
      }


    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}