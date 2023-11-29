import { render, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import AddTask from '../AddTask.js';
import '@testing-library/jest-dom/extend-expect';

test( 'display all the elements in add task component', ()=>{
    render(<MemoryRouter><AddTask/></MemoryRouter>); // renders the component

        // navigaation components present
        const Logo = screen.getByText(/Master/i);
        expect(Logo).toBeInTheDocument();

        //check if all the input labels present
        const taskTitle = screen.getByText(/Task Title/i);
        const taskDescription = screen.getByText(/Task Description/i);
        const priority = screen.getByText(/Priority/i);
        expect(taskTitle).toBeInTheDocument();
        expect (taskDescription).toBeInTheDocument();
        expect(priority).toBeInTheDocument();

        // check if buttons are present
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(4);


        // check for elements in the quote div.
        const quoteElement = screen.getByTestId('quote');
        const authorElement = screen.getByTestId('author');
        const authorImageElement = screen.getByTestId('author-image');
        expect(quoteElement).toBeInTheDocument();
        expect(authorElement).toBeInTheDocument();
        expect(authorImageElement).toBeInTheDocument();
    }
);
