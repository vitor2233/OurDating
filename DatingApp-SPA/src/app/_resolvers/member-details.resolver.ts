import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
/* Resolver criado para carregar os dados antes da página, então não irá causar problema. */
/* Usado para tirar o safeNavigator, que aparece no console undefined */
@Injectable()
export class MemberDetailResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        /* .pipe apenas para pegar o erro */
        return this.userService.getUser(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problema ao acessar data, tente novamente.');
                this.router.navigate(['/matches']);
                return of(null);
            })
        );
    }
}
