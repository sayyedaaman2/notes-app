import Form from "./Form";
import {v4 as uuidv4} from 'uuid'
import NoteList from "./NoteList";
import Button from "./common/Button";
import { useAddNote, useNoteQuery } from "../hooks/queryClient";
import { useState } from "react";
export default function Notes() {

    const { isLoading, data } = useNoteQuery();
    const [buttonContent, setButtonContent] = useState("Add Note");
    const { mutateAsync:addNote, isPending:addingNote } = useAddNote();
    function onClickHandler(data){
        let {title, content} = data;
    
        let newId = uuidv4();
        addNote({
            id: newId,
            title,
            content
        },{
            onSuccess : ()=> setButtonContent("Note Added"),
            onSettled : ()=> setTimeout(()=> setButtonContent("Add Note"),2000)
        })

    }
    return (
        <>
            {
                isLoading ? <h1>Loading...</h1> : <div className=" w-[900px] mx-auto p-4 flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">Notes</h1>

                    <Form onClickHandler={onClickHandler} ActionButton={<Button className="bg-purple-400 cursor-pointer" type="submit">{addingNote ? "Note Adding ..." : buttonContent}</Button>} />
                    <NoteList data={data} />
                </div>
            }
        </>
    )
}