import { useState } from "react";
export default function Form({id="",title="",content="",ActionButton, onClickHandler=()=>{}}) {
    const [form, setForm] = useState({
        id,
        title,
        content
    })

 
    function onSubmitHandler(e) {
        e.preventDefault();
      
        onClickHandler(form)

    }
    function onChangeHandler(e) {

        let { name, value } = e.target;
        setForm((prev) => {
            return {
                ...prev,
                [name]: value

            }
        })
    }
    return (
        <form className="border p-3 rounded-md flex flex-col gap-4 " onSubmit={onSubmitHandler}>
            <input className=" border p-2 rounded-md bg-white" type="text" aria-label="Title" name="title" placeholder="Title" defaultValue={form.title} onChange={onChangeHandler} />
            <textarea className="border p-2 rounded-md bg-white h-64 w-full"
                aria-label="Content" placeholder="Take a note ..."
                name="content"
                defaultValue={form.content}
                onChange={onChangeHandler}
            ></textarea>
            {ActionButton && ActionButton}
            
        </form>
    )
}