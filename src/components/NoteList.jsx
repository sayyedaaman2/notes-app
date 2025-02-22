import Card from "./Card";

export default function NoteList({data}){
    return(
        <ul className="flex  flex-col gap-3">
            {
                data.map((card)=> <Card key={card.id} id={card.id} title={card.title} content={card.content} pin={card.pin}/>)
            }
        </ul>
    )
}