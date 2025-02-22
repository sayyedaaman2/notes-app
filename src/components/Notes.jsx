import Form from "./Form";
import {v4 as uuidv4} from 'uuid'
import NoteList from "./NoteList";
import Button from "./common/Button";
import { useAddNote, useNoteQuery } from "../hooks/queryClient";
import { useState } from "react";
import { notify } from "../hooks/useNotification";
export default function Notes() {

    const { isLoading, data, isError, error } = useNoteQuery();
    const [buttonContent, setButtonContent] = useState("Add Note");
    const { mutateAsync:addNote, isPending } = useAddNote();
    function onClickHandler(data){
        let {title, content} = data;
    
        let newId = uuidv4();
        setButtonContent("Adding Note")
        addNote({
            id: newId,
            title,
            content
        },{
            onSuccess : ()=> {
                setButtonContent("Note Added");
                notify('success', "Note Added Successfully.")
                
            },
            onSettled : ()=> setTimeout(()=> setButtonContent("Add Note"),2000),
            onError : (error)=>{

                notify('error', "Failed to Add Note!")
            }
        })

    }
    return (
      
            
                <div className=" w-[900px] mx-auto p-4 flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">Notes</h1>

                    <Form onClickHandler={onClickHandler} ActionButton={<Button className="bg-purple-400 cursor-pointer" disable={isPending} type="submit">{buttonContent}</Button>} />
                    {
                        isLoading ? <h1>Loading...</h1> : <>{ data && <NoteList data={data} />}</>
                    }
                    { isError && <p>{error.message}</p>}
                </div>
           
       
    )
}