import Swal from 'sweetalert2'


import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from '../helpers/loadNotes';
import { uploadNote } from '../helpers/uploadNote';






//esto es lo que se envia a la base de datos para poder extraer la funcion
export const startNewNotes =()=> {
        return async (dispatch,getState)=> {

         const {uid} = getState().auth;

         const newNote =  {
             title:'',
             body: '',
             date: new Date().getTime(),
         }     

         const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
       
        dispatch(notesActive(doc.id,newNote));
        dispatch(notesAdd(doc.id,newNote));
    }
}

export const notesActive =(id,note)=> ({

    type: types.notesActive,
    payload :{
        id,
        ...note
    }

});
export const notesAdd =(id,note)=> ({

    type: types.notesAddNew,
    payload :{
        id,
        ...note
    }

});



export const starLoading =(uid)=> {

    return async (dispatch)=>{
        const notes= await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
})

export const stateSaveNote = (note)=>{
    return async (dispatch,getState)=> {

        const {uid} = getState().auth;
        
        if(!note.url){
            delete note.url;
        }

        const notofistore = {...note};
        delete notofistore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update( notofistore);

        dispatch(refreshNote(note.id,notofistore));

        Swal.fire('Note saved','','success')

    }
}

export const  refreshNote = (id,note)=> ({
    type: types.notesUpdate,
    payload : {
        id,
        note:{
            id,
            ...note
        }
    }
});


export const startWithPicture = (file)=> {
    return async (dispatch,getState)=> {
    
        const {active:activeNote} = getState().notes;
        
        

        Swal.fire({
            title:'Uploading',
            text: 'Please wait',
            allowOutsideClick: false,
            willOpen: () =>{
                Swal.showLoading();
            }
        });
        const fileUrl =await uploadNote(file);
        activeNote.url=fileUrl;

        dispatch( stateSaveNote(activeNote));
        Swal.close();
    }

}

export const startDeleteNote = (id)=> {
        return async (dispatch,getState)=> {
            
        const {uid} = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
            
        dispatch(deleteNote(id));

        Swal.fire('NOTE DELETE','','error')
}
}

export const deleteNote = (id)=> ({
    type:types.notesDelete,
    payload:id

});

export const notesCleaning = () => ({
    type: types.notesCleaning

});