import { MdAssignmentAdd } from "react-icons/md";


export const AddItem = ({text,setText,addRef,handleAddItem,handleKey}) => {
  return (
    <>
        <div className="input-box">
          <input type="text" className='addItem' placeholder='Add items' 
          value={text}
          ref={addRef} 
          onChange={(e)=>setText(e.target.value)}
          onKeyDown={handleKey} />
          <i onClick={handleAddItem}  ><MdAssignmentAdd  size={40}/></i>
        </div>
    </>
  )
}
