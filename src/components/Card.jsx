import { useState, useEffect, useRef } from "react"
import Form from "./Form";
import Button from "./common/Button";
import { GoPin } from 'react-icons/go'
import { FaTrash } from "react-icons/fa";
import { useDeleteNote, useUpdateNote } from "../hooks/queryClient";
import { TbPinnedOff } from "react-icons/tb";
import { notify } from "../hooks/useNotification";


export default function Card({ id, title, content, pin = false }) {
    const [saveButtonContent, setSaveButtonContent] = useState("Save");
    const [pinButtonContent, setPinButtonContent] = useState(!pin ? <GoPin /> : <TbPinnedOff />)
    const [deleteButtonContent, setDeleteButtonContent] = useState(<FaTrash />)
    const [isEditable, setIsEditable] = useState(false);
    const cardRef = useRef(null)
    const { mutateAsync: updateNote, } = useUpdateNote();
    const { mutateAsync: deleteNote, } = useDeleteNote();





    function deleteNoteHandler(id, event) {
        event.stopPropagation();
        setDeleteButtonContent("Deleting...")
        deleteNote(id, {
            onSuccess: () => {
                setDeleteButtonContent("Deleted");
                notify("success", "Note Deleted Successfuly.")
            },
            onSettled: () => setTimeout(() => setDeleteButtonContent(<FaTrash />), 2000),
            onError: () => {
                setDeleteButtonContent("Try Again!");

                notify("error", "Note Deletion Failed!.")
            }
        });
    }
    function pinNote(id, event) {
        event.stopPropagation();
        if (!pin) {
            setPinButtonContent("Pinning");
            updateNote({ id, data: { title, content, pin: !pin } }, {
                onSuccess: () => {
                    setPinButtonContent("Pinned");
                    notify('success', "Note Pinned")
                    setTimeout(() => setPinButtonContent(<TbPinnedOff />), 2000)
                },

                onError: () => {
                    setPinButtonContent("Try Again!");
                    setTimeout(() => setPinButtonContent(<GoPin />), 1000)
                    notify("error", "Note Pin Failed!.")
                }
            });
        } else {
            setPinButtonContent('UnPinning');
            updateNote({ id, data: { title, content, pin: !pin } }, {
                onSuccess: () => {
                    setPinButtonContent("UnPinned");
                    notify('success', "Note Unpinned")
                    setTimeout(() => setPinButtonContent(<GoPin />), 2000)
                },

                onError: () => {
                    setPinButtonContent("Try Again!");
                    setTimeout(() => setPinButtonContent(<TbPinnedOff />), 1000)
                    notify("error", "Note Unpin Failed!.")
                }
            });
        }


    }
    function onClickHandler(data) {
        let { id, title, content } = data;
        setSaveButtonContent("Saving....");
        updateNote({ id, data: { title, content } }, {
            onSuccess: () => {
                setSaveButtonContent("Saved");
                notify('success', "Note Updated.")

            },
            onSettled: () => setTimeout(() => {
                setSaveButtonContent('save')
                setIsEditable(false)
            }, 2000),
            onError: () => {
                setSaveButtonContent("Try Again!");
                notify("error", "Note Update Failed!.")

            }
        });




    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsEditable(false);
            }
        }
        if (isEditable) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditable]);
    return (
        <li ref={cardRef}>

            {
                isEditable ? <Form onClickHandler={onClickHandler} id={id} title={title} content={content} ActionButton={<Button type="submit" className="bg-purple-400 cursor-pointer">{saveButtonContent}</Button>} /> : (
                    <div className="relative flex flex-col gap-4 border p-3 rounded-md h-64" onClick={() => setIsEditable(true)}>
                        <h1 className="text-2xl font-semibold">
                            {title}
                        </h1>
                        <p className="">
                            {content}
                        </p>
                        <Button aria-label="pin" onClick={(event) => pinNote(id, event)} className=" absolute border  top-10 right-10 cursor-pointer hover:bg-blue-500 hover:text-white">

                            {
                                pinButtonContent
                            }
                        </Button>
                        <Button aria-label="delete" onClick={(event) => deleteNoteHandler(id, event)} className=" absolute border  bottom-10 right-10 cursor-no-drop hover:bg-red-500 hover:text-white">

                            {
                                deleteButtonContent
                            }
                        </Button>
                    </div>
                )
            }


        </li>
    )
}