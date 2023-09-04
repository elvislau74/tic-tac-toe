import { render } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm';
// import { LoginCheck } from '../components/LoginCheck';
import { LoginProvider } from '../utils/LoginContext';

test('LoginForm renders', () => {
    render(
        <LoginProvider>
            <LoginForm />
            {/* <LoginCheck /> */}
        </LoginProvider>
    );
});