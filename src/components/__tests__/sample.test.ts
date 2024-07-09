it('receives a mocked response to a REST API request', async () => {
    const response = await fetch('https://api.example.com/user');

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(await response.json()).toEqual({
        firstName: 'John',
        lastName: 'Maverick',
    });
});

it('receives a mocked response to a REST API requets to a relative URL', async () => {
    const response = await fetch('/product');

    expect(response.status).toBe(200);
    expect(response.statusText).toBe('OK');
    expect(await response.json()).toEqual({
        name: 'Awesome Product',
    });
});
