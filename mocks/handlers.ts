import { http, HttpResponse } from 'msw';

export const handlers = [
    http.get('https://api.example.com/user', () => {
        return HttpResponse.json({
            firstName: 'John',
            lastName: 'Maverick',
        });
    }),
    http.get('/product', () => {
        return HttpResponse.json({
            name: 'Awesome Product',
        });
    }),
];
