import React from 'react'
import { JournalEntry } from './JournalEntry';
import {useSelector} from 'react-redux';

export const JournalEntries = () => {

    const {notes}=useSelector(  select=>  select.notes)

    
    return (
        <div className="journal__entries">
            
            {
                notes.map( note => (
                    
                    <JournalEntry key={ note.id } {...note} />
                   
                ))
               
            }

        </div>
    )
}
