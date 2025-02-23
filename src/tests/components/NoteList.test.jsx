import {renderWithAppContext} from '../utils'
import NoteList from '../../components/NoteList'
import {screen} from '@testing-library/react'
describe("NoteList Component",()=>{

    it("renders with no data", () => {
        const data = [];
    
        renderWithAppContext(<NoteList data={data} />);
    	expect(screen.getByRole('list')).toBeInTheDocument();
        
    });
    it("renders <li> elements inside <ul>", () => {
        const data = [
            { id: 1, title: "Testing 1", content: "Content 1", pin: false },
            { id: 2, title: "Testing 2", content: "Content 2", pin: true }
        ];
    
        renderWithAppContext(<NoteList data={data} />);
    	expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem').length).toBe(2)

        expect(screen.getByText(/Testing 1/)).toBeInTheDocument();
        expect(screen.getByText(/Testing 2/)).toBeInTheDocument();

        expect(screen.getByText(/Content 1/)).toBeInTheDocument();
        expect(screen.getByText(/Content 2/)).toBeInTheDocument();
    });
    
})