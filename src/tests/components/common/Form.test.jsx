import {screen, waitFor} from '@testing-library/react'
import Form from '../../../components/Form'
import Button from '../../../components/common/Button'
import server from '../../mock-api-server'
import { renderWithAppContext, waitOneTick } from '../../utils'
import userEvent from '@testing-library/user-event'
import { http,HttpResponse } from 'msw'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { useAddNote } from '../../../hooks/queryClient'
import { notify } from '../../../hooks/useNotification'
describe("Form Component",()=>{
    beforeEach(()=>{
        server.use(
            http.post("http://localhost:3000/notes", async({request})=>{
                const postedNote = await request.json();
                await waitOneTick();
                return HttpResponse.json(postedNote);
            })
        )
    })
    it("Render Form Component",async()=>{
        renderWithAppContext(<Form/>);
        expect(screen.getByRole('textbox',{ name : "Title"})).toBeInTheDocument();
        expect(screen.getByRole('textbox',{ name : "Content"})).toBeInTheDocument();

    })
    it("Render Form With Submit Button",async()=>{
        const Button = ()=> <button type='submit'>Submit</button>
        renderWithAppContext(<Form ActionButton={<Button/>}/>)
        screen.debug();
        expect(screen.getByRole('button',{ name : "Submit"})).toBeInTheDocument();

    })
    it("Render Form With Save Button",async()=>{
        const Button = ()=> <button type='submit'>Save</button>
        renderWithAppContext(<Form ActionButton={<Button/>}/>)
        screen.debug();
        expect(screen.getByRole('button',{ name : "Save"})).toBeInTheDocument();

    })
    it("Form Submit without values",async()=>{
        
        renderWithAppContext(<Form ActionButton={<Button type='submit'>Add Note </Button>}/>)
        userEvent.click(screen.getByRole('button',{name : "Add Note"}))

        expect(await screen.findByText('Title is Required!')).toBeInTheDocument()
    })
    it("Form Submit only Title values",async()=>{
        
        renderWithAppContext(<Form ActionButton={<Button type='submit'>Add Note </Button>}/>)
        await userEvent.type(screen.getByRole('textbox',{name : "Title"}), "Testing");

        await userEvent.click(screen.getByRole('button',{name : "Add Note"}))
        expect(await screen.findByText('Content is Required!')).toBeInTheDocument()
    })
    it("Form Submit with Title and Content values", async () => {
        function TestWrapper() {
            const [ButtonContent, setButtonContent] = useState("Add Note");
            const {mutate:addNote} = useAddNote()
            function onClickHandler(data) {
                let { title, content } = data;
                let newId = uuidv4();
                setButtonContent("Adding Note");
                waitOneTick()
                addNote(
                    {
                        id: newId,
                        title,
                        content,
                    },
                    {
                        onSuccess: () => {
                            setButtonContent("Note Added");
                            notify("success", "Note Added Successfully.");
                        },
                        onSettled: () =>
                            setTimeout(() => setButtonContent("Add Note"), 2000),
                        onError: () => {
                            notify("error", "Failed to Add Note!");
                        },
                    }
                );
            }
    
            return (
                <Form
                    onClickHandler={onClickHandler}
                    ActionButton={<Button type="submit">{ButtonContent}</Button>}
                />
            );
        }
    
        renderWithAppContext(<TestWrapper />);
    
        await userEvent.type(screen.getByRole("textbox", { name: "Title" }), "Testing");
    
        await userEvent.type(screen.getByRole("textbox", { name: "Content" }), "This is A Content");
    
        await userEvent.click(screen.getByRole("button", { name: "Add Note" }));
        
        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Adding Note" })).toBeInTheDocument();
        });
       
        expect(await screen.findByText("Note Added Successfully.")).toBeInTheDocument();
    
        await new Promise((resolve) => setTimeout(resolve, 2000));
        expect(await screen.findByRole("button", { name: "Add Note" })).toBeInTheDocument();
    });

    it("Form Submit with Title and Content values Failed", async () => {
        server.use(
            http.post("http://localhost:3000/notes", async ({ request }) => {
              return HttpResponse.error({ status: 500, statusText: "Internal Server Error" });
            })
          );

        function TestWrapper() {
            const [ButtonContent, setButtonContent] = useState("Add Note");
            const {mutate:addNote} = useAddNote()
            function onClickHandler(data) {
                let { title, content } = data;
                let newId = uuidv4();
                setButtonContent("Adding Note");
                waitOneTick()
                addNote(
                    {
                        id: newId,
                        title,
                        content,
                    },
                    {
                        onSuccess: () => {
                            setButtonContent("Note Added");
                            notify("success", "Note Added Successfully.");
                        },
                        onSettled: () =>
                            setTimeout(() => setButtonContent("Add Note"), 2000),
                        onError: () => {
                            notify("error", "Failed to Add Note!");
                        },
                    }
                );
            }
    
            return (
                <Form
                    onClickHandler={onClickHandler}
                    ActionButton={<Button type="submit">{ButtonContent}</Button>}
                />
            );
        }
    
        renderWithAppContext(<TestWrapper />);
    
        await userEvent.type(screen.getByRole("textbox", { name: "Title" }), "Testing");
    
        await userEvent.type(screen.getByRole("textbox", { name: "Content" }), "This is A Content");
    
        await userEvent.click(screen.getByRole("button", { name: "Add Note" }));
        
        await waitFor(() => {
            expect(screen.getByRole("button", { name: "Adding Note" })).toBeInTheDocument();
        });
       
        expect(await screen.findByText("Failed to Add Note!")).toBeInTheDocument();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        expect(await screen.findByRole("button", { name: "Add Note" })).toBeInTheDocument();
    });
 
    
})