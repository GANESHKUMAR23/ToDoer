import { FaSearchPlus,FaSearchMinus } from "react-icons/fa";

export const SearchItem = ({search,setSearch,searchRef,searchBtn,searchText,handleSearch}) => {
  return (
    <>
        <div className="input-box">
            <input type="text" className='searchItem' placeholder='Search items'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={searchRef}
            style={
                searchText ? {visibility:"visible",flex:1,} : {visibility:"hidden",flex:0,padding:0}
            }
            />
            <i onClick={handleSearch}>{searchBtn ? <FaSearchPlus className='icon' /> : <FaSearchMinus className='icon' />}</i>
        </div>
    </>
  )
}
