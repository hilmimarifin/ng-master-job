import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { IJobPosition } from "../types/job-title";


@Injectable({
    providedIn: 'root'
})

export default class JobPositionService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    baseUrl= 'http://localhost:9000'
    ASPbaseUrl= 'http://localhost:5045'

    getList(): Observable<IJobPosition[]> {
        return this.http.get<IJobPosition[]>(`${this.ASPbaseUrl}/job-position`)
            .pipe(
                catchError(this.handleError<IJobPosition[]>('getList', []))
            )
    }

    create(jobTitle: IJobPosition): Observable<IJobPosition> {
        return this.http.post<IJobPosition>(`${this.baseUrl}/job-position`, jobTitle, this.httpOptions).pipe(
            catchError(this.handleError<IJobPosition>('create'))
        );
    }

    update(jobTitle: IJobPosition): Observable<IJobPosition> {
        return this.http.patch<IJobPosition>(`${this.baseUrl}/job-position/update`, jobTitle, this.httpOptions).pipe(
          catchError(this.handleError<any>('update'))
        );
      }
    

    delete(id: number): Observable<IJobPosition> {
        return this.http.delete<IJobPosition>(`${this.baseUrl}/job-position/delete`, {...this.httpOptions, body: {id: id}}).pipe(
          catchError(this.handleError<IJobPosition>('deleteHero'))
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