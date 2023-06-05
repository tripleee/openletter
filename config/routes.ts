import users from '../routes/users';
import dashboard from '../routes/dashboard';

export const routes: {[key: string]: Function} = {
    '/users': users,
    '/': dashboard
};