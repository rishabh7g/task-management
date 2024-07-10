import React from 'react';
import { mount } from 'cypress/react18';
import { PrimaryButton } from 'src/components/button/Button';

describe('Button comonent testing', () => {
    it('renders card content', () => {
        mount(<PrimaryButton label='Click orange juice' />);
    });
});
