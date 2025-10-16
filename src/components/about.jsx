import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/NoteContext';

export default function about() {
  const user = useContext(noteContext);
  
  return (
<div>
    <h1>Hello This is About </h1>
</div>


)
}
