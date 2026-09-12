import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

// Load
export const loadUsers = createAction('[Users] Load Users');
export const loadUsersSuccess = createAction('[Users] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[Users] Load Users Failure', props<{ error: string }>());

// Create
export const addUser = createAction('[Users] Add User', props<{ newUser: Omit<User, 'id'> }>());
export const addUserSuccess = createAction('[Users] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[Users] Add User Failure', props<{ error: string }>());

// Update
export const updateUser = createAction('[Users] Update User', props<{ editedUser: User }>());
export const updateUserSuccess = createAction('[Users] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[Users] Update User Failure', props<{ error: string }>());

// Delete
export const deleteUser = createAction('[Users] Delete User', props<{ id: number }>());
export const deleteUserSuccess = createAction('[Users] Delete User Success', props<{ id: number }>());
export const deleteUserFailure = createAction('[Users] Delete User Failure', props<{ error: string }>());

// Is Editing
export const isEditing = createAction('[Users] Set User To Edit', props<{ isEditing: boolean }>());

// Check App Init
export const checkAppInit = createAction('[Users] Check App Init');
export const checkAppInitSuccess = createAction('[Users] Check App Init Success', props<{ currentUser: User }>());
export const checkAppInitFailure = createAction('[Users] Check App Init Failure', props<{ error: string }>());