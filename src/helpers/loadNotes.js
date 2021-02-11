import { db } from "../firebase/firebase-config"


export const loadNotes = async(uid)=> {

    const Snap =await db.collection(`${uid}/journal/notes`).get();

    console.log(Snap)
    const notes= []

    Snap.forEach(snapHijo => { //se almacena los datos de notas de firebase en el arreglo notes
        notes.push({        
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    
    return  notes;
}