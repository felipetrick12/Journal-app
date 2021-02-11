import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { startWithPicture, stateSaveNote } from '../../actions/notes';


export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const {active} = useSelector( state => state.notes );
    const handleSave = () =>
    {
        dispatch(stateSaveNote(active))
    }

    const handlePicture =()=>{
        document.querySelector('#fileStore').click();
    }

    const HandleChange =(e) => {
        const file = e.target.files[0];

        if(file) {
            dispatch(startWithPicture(file));
        }
    }
    return (
        <div className="notes__appbar">
            <span>28 de agosto 2020</span>
            
            <input
            id="fileStore"
            name='file'
            style={{display:'none'}}
            type="file"
            onChange={HandleChange}
            />
            <div>
                <button className="btntwo" onClick={handlePicture}>
                    Picture
                </button>

                <button className="btntwo" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
