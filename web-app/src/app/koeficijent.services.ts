import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map ,} from 'rxjs/operators';
import { Koeficijent } from './classes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PutnikService {

    private putniksUrl = 'http://localhost:52295/api/Koeficients';  // URL to web api
    
    constructor(private http: HttpClient) { }

    
}

