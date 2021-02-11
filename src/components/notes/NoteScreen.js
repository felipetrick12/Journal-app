import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notesActive, startDeleteNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {   

    
    const {active:note} = useSelector( state => state.notes );
    const [Form,handleInputChange,reset] = useForm(note);
    const {body,title}=Form;
  
    const activeId = useRef(note.id);

    const dispatch = useDispatch();

    useEffect(() => { //cuando cambia la id cambia la nota, se utiliza el efecto para q se ejecute,
        if(note.id!==activeId.current)
        {
            reset(note);
            activeId.current=note.id
        }
    }, [note,reset])

    useEffect(() => { //REALIZA ESTE EFECTO CUANDO EL VALOR DEL TEXTO CAMBIA Y SE LO ENVIA AL REDUX
        dispatch(notesActive(Form.id,Form))
    }, [Form])

    const handleDelete = () => {
        dispatch(startDeleteNote(note.id));
    }

    return (
        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                ></textarea>
                
             {           
                    (note.url)
                     &&
                    <div className="notes__image">
                    <img 
                        src={note.url}
                        alt="imagen"
                         />
                     </div>
            }
                


            </div>
            <button className="btn btn__danger" onClick={handleDelete}>
                Delete
            </button>

        </div>
    )
}
