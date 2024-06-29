
import { FaTrashAlt } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { HighLightedText } from "./HighLightedText";



export const Content = ({items,handleCheck,handleDelete,search}) => {


  // const GetHighlightedtext = (task) => {

  //     console.log(typeof task,task);
  //     let highlightedText = task.text.split(new RegExp(`(${search})`,"gi"));
  //     console.log(highlightedText[0].toLowerCase()+" "+search.toUpperCase()); 

    

  //     return (
       
  //       <span>
  //         { highlightedText.map((text) => text.toLowerCase() === search.toLowerCase() ? 
  //         <b>{text.toLowerCase()}</b> : text.toLowerCase()
  //         )}
  //       </span>
  //     )
  // }

  


  return (

    
    <>
      
          <ul className='content'>

              { items.length > 0 

                  ? 

                  items.map((item) => (
                    <li className="box" key={item.id} >
                        <input type="checkbox" checked={item.checked} onChange={()=>handleCheck(item.id)} />
                        <label htmlFor="" ><HighLightedText text={item.task} search = {search} /></label>
                        <i className="trash" onClick={()=>handleDelete(item.id)} ><FaTrashAlt  /></i>
                    </li>
                  )) 

                  : 
                  
                  <div className="empty">
                    <i><GiNotebook/></i>
                    <h2 > Your list is Empty </h2>
                  </div>


              }

      
          </ul>
    
    </>


    
  )
}
