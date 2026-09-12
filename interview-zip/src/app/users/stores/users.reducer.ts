import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UsersActions from './users.actions';

export interface UsersState {
  users: User[];
  loading: boolean;
  isEditing: boolean;
  isInitialized: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  isEditing: false,
  isInitialized: false,
  error: null,
};

export const usersReducer = createReducer(
    initialState,

    // Load
    on(UsersActions.loadUsers, state => ({ ...state, loading: true, error: null })),
    on(UsersActions.loadUsersSuccess, (state, { users }) => ({ ...state, users, loading: false })),
    on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // Add
    on(UsersActions.addUser, state => ({ ...state, loading: true })),
    on(UsersActions.addUserSuccess, (state, { user }) => ({ ...state, users: [...state.users, user], loading: false })),
    on(UsersActions.addUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // Update
    on(UsersActions.updateUser, state => ({ ...state, loading: true })),
    on(UsersActions.updateUserSuccess, (state, { user }) => ({ ...state, users: state.users.map(u => (u.id === user.id ? user : u)), loading: false })),
    on(UsersActions.updateUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // Delete
    on(UsersActions.deleteUser, state => ({ ...state, loading: true })),
    on(UsersActions.deleteUserSuccess, (state, { id }) => ({ ...state, users: state.users.filter(u => u.id !== id), loading: false })),
    on(UsersActions.deleteUserFailure, (state, { error }) => ({ ...state, error, loading: false })),

    // isEditing
    on(UsersActions.isEditing, (state, { isEditing }) => ({...state, isEditing})),

    // Check App Init
    on(UsersActions.checkAppInit, state => ({ ...state, loading: true })),
    on(UsersActions.checkAppInitSuccess, ( state, {currentUser}) => ({...state, currentUser, loading: false, isInitialized: true })),
    on(UsersActions.checkAppInitFailure, (state, { error }) => ({ ...state, error, loading: false, isInitialized: true })) 
);