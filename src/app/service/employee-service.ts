import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { IEmployee } from "../types/employee";
import { IJobPosition } from "../types/job-title";


@Injectable({
    providedIn: 'root'
})

export default class EmployeeService {
    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    baseUrl= 'http://localhost:9000'
    ASPbaseUrl= 'http://localhost:5296'

    getList(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(`${this.ASPbaseUrl}/employee`)
            .pipe(
                catchError(this.handleError<IEmployee[]>('getList', []))
            )
    }

    create(employee: IEmployee): Observable<IEmployee> {
        return this.http.post<IEmployee>(`${this.ASPbaseUrl}/employee/create`, employee, this.httpOptions).pipe(
            catchError(this.handleError<IEmployee>('create'))
        );
    }

    update(employee: IEmployee): Observable<IEmployee> {
        return this.http.patch<IEmployee>(`${this.ASPbaseUrl}/employee/update`, employee, this.httpOptions).pipe(
          catchError(this.handleError<any>('update'))
        );
      }
    

    delete(id: string): Observable<IEmployee> {
        return this.http.delete<IEmployee>(`${this.ASPbaseUrl}/employee/delete`, {...this.httpOptions, body: {id: id}}).pipe(
          catchError(this.handleError<IEmployee>('delete'))
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