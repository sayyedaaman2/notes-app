import Card from '../../components/Card'
import { renderWithAppContext, waitOneTick } from '../utils'
import { expect } from 'vitest'
import {screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import server from '../mock-api-server'
import { http, HttpResponse } from 'msw'

describe("Card Component",()=>{
  

    it("Render Card Component",()=>{
        renderWithAppContext(<Card id={1} title={"Testing"} content={"Testing Content"} pin={false} />)

        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();

    })
    it("Card Component Editable",async()=>{
        renderWithAppContext(<Card id={1} title={"Testing"} content={"Testing Content"} pin={false} />)

        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();

        await userEvent.click(screen.getByRole('heading',{name : "Testing"}));
        expect(screen.getByRole('textbox',{name : "Title"})).toBeInTheDocument();
        expect(screen.getByRole('textbox',{name : "Content"})).toBeInTheDocument();
        await userEvent.click(document.body);

        expect(screen.queryByRole('textbox', { name: "Title" })).not.toBeInTheDocument();
        expect(screen.queryByRole('textbox', { name: "Content" })).not.toBeInTheDocument();
        
        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();
    })
    it("Card Update",async()=>{
        server.use(
            http.patch("http://localhost:3000/notes/1", async({request})=>{
                const postedNote = await request.json();
                console.log("Mocked PATCH request hit",postedNote);
                await waitOneTick();
                return HttpResponse.json(postedNote);
            })
        )
        renderWithAppContext(<Card id={1} title={"Testing"} content={"Testing Content"} pin={false} />)

        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();
        
        await userEvent.click(screen.getByRole('heading',{name : "Testing"}));
        expect(screen.getByRole('textbox',{name : "Title"})).toBeInTheDocument();
        expect(screen.getByRole('textbox',{name : "Content"})).toBeInTheDocument();
        await userEvent.type(screen.getByRole('textbox',{name : "Title"}),"Testing 1")
        await userEvent.type(screen.getByRole('textbox',{name : "Content"}),"Testing Content 2")
        await userEvent.click(screen.getByRole('button',{name : "Save"}));
        
            expect(screen.getByRole('button',{name : /Saving.../})).toBeInTheDocument();
            await waitFor(()=>{
            expect(screen.getByRole('button',{name : /Saved/})).toBeInTheDocument();
            })
            expect(await screen.findByText("Note Updated.")).toBeInTheDocument();
            await waitFor(()=>{
                expect(screen.getByRole('button',{name : /Save/})).toBeInTheDocument();
            })

    
    })
    it("Card Pinned",async()=>{
        server.use(
            http.patch("http://localhost:3000/notes/1", async({request})=>{
                const postedNote = await request.json();
                console.log("Mocked PATCH request hit",postedNote);
                await waitOneTick();
                return HttpResponse.json(postedNote);
            })
        )
        renderWithAppContext(<Card id={1} title={"Testing"} content={"Testing Content"} pin={false} />)

        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();
        expect(screen.getByLabelText('pin')).toBeInTheDocument();
        let pinButton = await screen.getByLabelText('pin');
        await userEvent.click(pinButton)

        await waitFor(() => {
            expect(screen.getByText('Pinning')).toBeInTheDocument();
          });
  
        await waitFor(() => expect(screen.getByText('Pinned')).toBeInTheDocument());
        expect(await screen.findByText("Note Pinned")).toBeInTheDocument();
        await waitFor(() => expect(screen.getByLabelText('pin')).toBeInTheDocument());
       
    
    
    })
    it("Card UnPinned",async()=>{
        server.use(
            http.patch("http://localhost:3000/notes/2", async({request})=>{
                const postedNote = await request.json();
                console.log("Mocked PATCH request hit",postedNote);
                await waitOneTick();
                return HttpResponse.json(postedNote);
            })
        )
        renderWithAppContext(<Card id={2} title={"Testing"} content={"Testing Content"} pin={true} />)

        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();
        expect(screen.getByLabelText('pin')).toBeInTheDocument();
        let pinButton = await screen.getByLabelText('pin');
        await userEvent.click(pinButton)

        await waitFor(() => {
            expect(screen.getByText('UnPinning')).toBeInTheDocument();
          });
  
        await waitFor(() => expect(screen.getByText('UnPinned')).toBeInTheDocument());
        expect(await screen.findByText("Note Unpinned")).toBeInTheDocument();
        await waitFor(() => expect(screen.getByLabelText('pin')).toBeInTheDocument());
       
    
    
    })
    it("Card Delete",async()=>{
        server.use(
            http.delete("http://localhost:3000/notes/2", async({request})=>{
                
                console.log("Mocked PATCH request hit");
                await waitOneTick();
                return HttpResponse.json({
                    id : 2,
                    title : "Testing",
                    content : "Testing Content",
                    pin : false,
                });
            })
        )
        renderWithAppContext(<Card id={2} title={"Testing"} content={"Testing Content"} pin={true} />)

        expect(screen.getByRole('heading',{name : "Testing"})).toBeInTheDocument();
        expect(screen.getByText("Testing Content")).toBeInTheDocument();
        expect(screen.getByLabelText('delete')).toBeInTheDocument();
        let deleteButton = await screen.getByLabelText('delete');
        await userEvent.click(deleteButton)

        await waitFor(() => {
            expect(screen.getByText('Deleting...')).toBeInTheDocument();
          });
  
        await waitFor(() => expect(screen.getByText('Deleted')).toBeInTheDocument());
        expect(await screen.findByText("Note Deleted Successfuly.")).toBeInTheDocument();
        await waitFor(() => expect(screen.getByLabelText('delete')).toBeInTheDocument());
       
    
    
    })
})