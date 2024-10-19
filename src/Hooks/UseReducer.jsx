import React, { useReducer } from 'react';

const initialState = {
    name: '',
    email: '',
    age: ''
};

function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'SUBMIT_FORM':
            return {
                ...state,
                isSubmitting: true,
            };
        case 'FORM_SUCCESS':
            return {
                ...initialState,
                isSubmitting: false,
                error: null,
            };
        case 'FORM_ERROR':
            return {
                ...state,
                isSubmitting: false,
                error: action.error,
            };
        default:
            throw new Error();
    }
}

function UseReducer() {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.name,
            value: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'SUBMIT_FORM' });

        setTimeout(() => {
            if (state.name && state.email) {
                console.log('Submitted Data:', state);

                dispatch({ type: 'FORM_SUCCESS' }); 
                alert('Form Submitted Successfully');
            } else {
                dispatch({ type: 'FORM_ERROR', error: 'Form validation failed!' });
            }
        }, 1000);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={state.name} onChange={handleChange} />
                <br />
                <input type="email" name="email" placeholder="Email" value={state.email} onChange={handleChange} />
                <br />
                <input type="number" name="age" placeholder="Age" value={state.age} onChange={handleChange} />
                <br />
                <button type="submit" disabled={state.isSubmitting}>
                    {state.isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
        </div>
    );
}

export default UseReducer;
