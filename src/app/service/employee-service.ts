import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
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

    ASPbaseUrl= 'http://localhost:5296'

    getList(): Observable<IEmployee[]> {
        return this.http.get<IEmployee[]>(`${this.ASPbaseUrl}/employee`)
            .pipe(
                catchError((error) => throwError(() => new Error(error)))
            )
    }

    create(employee: IEmployee): Observable<IEmployee> {
        return this.http.post<IEmployee>(`${this.ASPbaseUrl}/employee/create`, employee, this.httpOptions).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
    }

    update(employee: IEmployee): Observable<IEmployee> {
        return this.http.patch<IEmployee>(`${this.ASPbaseUrl}/employee/update`, employee, this.httpOptions).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
      }
    

    delete(id: string): Observable<any> {
        return this.http.delete<IEmployee>(`${this.ASPbaseUrl}/employee/delete`, {...this.httpOptions, body: {id: id}}).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
      }
}