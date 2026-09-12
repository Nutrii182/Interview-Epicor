import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersService } from "../services/users.service";
import * as UsersActions from './users.actions';
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class UsersEffects {

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers),
            switchMap(() =>
                this.usersService.getUsers().pipe(
                    map(users => UsersActions.loadUsersSuccess({ users })),
                    catchError(error =>
                        of(UsersActions.loadUsersFailure({ error: error.message || 'Error al cargar usuarios' }))
                    )
                )
            )
        )
    );

    addUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.addUser),
            exhaustMap(({ newUser }) =>
                this.usersService.addUser(newUser).pipe(
                    map((user) => UsersActions.addUserSuccess({ user })),
                    catchError(error =>
                        of(UsersActions.addUserFailure({ error: error.message || 'Error al agregar usuario' }))
                    )
                )
            )
        )
    );

    updateUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.updateUser),
            exhaustMap(({ editedUser }) =>
                this.usersService.editUser(editedUser.id!, editedUser).pipe(
                    map((user) => UsersActions.updateUserSuccess({ user })),
                    catchError(error =>
                        of(UsersActions.updateUserFailure({ error: error.message || 'Error al actualizar usuario' }))
                    )
                )
            )
        )
    );

    deleteUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.deleteUser),
            mergeMap(({ id }) =>
                this.usersService.deleteUser(id).pipe(
                    map(() => UsersActions.deleteUserSuccess({ id })),
                    catchError(error =>
                        of(UsersActions.deleteUserFailure({ error: error.message || 'Error al eliminar usuario' }))
                    )
                )
            )
        )
    );

    isAppInitialized$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.checkAppInit),
            switchMap(() =>
                this.usersService.getUser(1).pipe(
                    map(currentUser => UsersActions.checkAppInitSuccess({ currentUser })),
                    catchError(error =>
                        of(UsersActions.checkAppInitFailure({ error: error.message || 'Error al inicializar la aplicación' }))
                    )
                )
            )
        )
    );

    constructor(private actions$: Actions, private usersService: UsersService) { }

}