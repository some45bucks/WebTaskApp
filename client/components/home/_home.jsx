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
    <div className ="bg-blue-200">
      <div className ="bg-blue-900/90 mr-1"> top bar </div>
    <div className ="flex flex-row h-full"> 
      <div className ="bg-blue-900/90 flex-none w-1/6 mr-1 "> side bar </div>
      <div className ="bg-blue-300/75 flex-1 rounded m-1 mb-1"> article1 </div>
      <div className ="bg-blue-500/75 flex-1 rounded m-1 mb-1"> article2 </div>
      <div className ="bg-blue-700/75 flex-1 rounded m-1 mb-1"> To-Do </div>
      <div className ="bg-blue-900/75 flex-1 rounded m-1 mb-1"> Finished </div>
    </div>
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