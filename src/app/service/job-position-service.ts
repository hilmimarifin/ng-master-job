import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of, throwError } from "rxjs";
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

    baseUrl = 'http://localhost:9000'
    ASPbaseUrl = 'http://localhost:5296'

    getList(): Observable<IJobPosition[]> {
        return this.http.get<IJobPosition[]>(`${this.ASPbaseUrl}/job-position`)
            .pipe(
                catchError((error) => throwError(() => new Error(error)))
            )
    }

    create(jobTitle: IJobPosition): Observable<IJobPosition> {
        return this.http.post<IJobPosition>(`${this.ASPbaseUrl}/job-position/create`, jobTitle, this.httpOptions).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
    }

    update(jobTitle: IJobPosition): Observable<IJobPosition> {
        return this.http.patch<IJobPosition>(`${this.ASPbaseUrl}/job-position/update`, jobTitle, this.httpOptions).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
    }


    delete(id: string): Observable<any> {
        return this.http.delete<IJobPosition>(`${this.ASPbaseUrl}/job-position/delete`, { ...this.httpOptions, body: { id: id } }).pipe(
            catchError((error) => throwError(() => new Error(error)))
        );
    }

}