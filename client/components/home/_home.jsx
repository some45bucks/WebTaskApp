import { Button } from './button';
import { useState, useContext, useEffect } from 'react';
import { ApiContext } from '../../utils/api_context';
import { notStrictEqual } from 'assert';
//import { ApiContext } from '../../utils/api_content';

export const Home = () => {
  const [count, setCount] = useState(0);
  // const [??TASK, ??setTASK] = useState([]);

  // for creating a loading when we fetch 
  //const [loading, setLoading] = useState(true);

  // for putting contents into textarea
  // const [noteContents, setNoteContents] = useState('');

  //const api = useContext(ApiContext);

  // useEffect(async () => {
  //   // const {??TASK} = await api.get('??TASK NAME HERE');
  //   setLoading(false);
  //   setNotes(notes);
  // }, []);

  //  if (loading) return <div>Loading...(??TASK) </div>;

  // const saveNote = async () => {
  //   const noteBody = {
  //     contents: noteContents,
  //   };
  //   const { note } = await ApiContext.post('/notes', noteBody);
  //   setNotes([...notes, note]); //get all notes from notes array, put into note
  // };

  return (

    <div className="flex flex-col bg-red-200 h-full w-1/2 justify-center">
      <textarea
        className="p-2 border-2 rounded flex"
        />
        <Button> hello! </Button>
    </div>

    
    

    // <div>
    //   <textarea 
    //     value={noteContents} 
    //     onChange={(e) => setNoteContents(e.target.value)}
    //     className="p-2 border-2 rounded" 
    //   />
    //   <Button onClick={saveNote}>Save</Button>
    // </div> 
  );
};
//server\controllers\api\notes.controller - has a "NotePostBody" with contents of string

    // just basic button display
    // <div>
    //   <h2 className="text-9xl">{count}</h2>
    //   <div>
    //     <Button onClick={()=> setCount(count - 1)}>Decrement</Button>
    //     <Button onClick={()=> setCount(count + 1)}>Increment</Button>
    //   </div>
    // </div>