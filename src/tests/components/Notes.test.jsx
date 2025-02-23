import Notes from '../../components/Notes';
import {screen,waitFor} from '@testing-library/react'
import {renderWithAppContext, waitOneTick} from '../utils'
import server from '../mock-api-server'
import { http, HttpResponse } from 'msw';

describe("Render Notes",()=>{

    it("Render Notes Component with Loading state",()=>{
       

        renderWithAppContext( <Notes/>);

        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    })

    it("renders Notes Component with data", async () => {
        server.use(
            http.get("http://localhost:3000/notes", async () => {
                const data = [
                    { id: 1, title: "Testing 1", content: "Content 1", pin: false },
                    { id: 2, title: "Testing 2", content: "Content 2", pin: true }
                ];
                console.log("Mock API hit", data);
                return HttpResponse.json(data);
            })
        );
    
        renderWithAppContext(<Notes />);
    
        // Ensure loading state is displayed
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    
        // Wait for the list to appear
        expect(await screen.findByRole('list')).toBeInTheDocument();
        expect( await screen.getByText(/Testing 1/)).toBeInTheDocument();
        expect( await screen.getByText(/Testing 2/)).toBeInTheDocument();
        expect( await screen.getByText(/Content 1/)).toBeInTheDocument();
        expect( await screen.getByText(/Content 2/)).toBeInTheDocument();

        screen.debug();
    });
    
})