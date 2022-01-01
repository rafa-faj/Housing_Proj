import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

/* generate random ids for react elements and more 
   example: generate random id if controlId isn't specified by parent component
*/
const useRandomID = (id: string | undefined) => useRef(id || uuidv4()).current;

export default useRandomID;
