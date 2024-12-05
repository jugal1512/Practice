import { environment } from '../environments/environment';

export const endpoints = {
    Auth : environment.baseUrl + '/Authentication',
    Register : environment.baseUrl + '/UserManagement',
};