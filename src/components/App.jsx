import React, { useState, useRef, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AddItem } from "./AddItem";
import { SearchItem } from "./SearchItem";
import { Content } from "./Content";
import { BiSolidError } from "react-icons/bi";
import { Loading } from "./Loading";
import { apiRequest } from "./apiRequest";

export const App = () => {

  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [searchBtn, setSearchBtn] = useState(true);
  const [searchText, setSearchText] = useState(false);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchRef = useRef(null);
  const addRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchApi = async () => {
      try {
        const API_URL = "http://localhost:3500/items";
        const response = await fetch(API_URL);
        const data = await response.json();
        setItems(data);
        setFetchError(null);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setFetchError("Data Not Received");
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => fetchApi())();
    }, 2000);
  }, []);

  async function handleCheck(id) {

    const newList = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );

    setItems(newList);

    const itemList = newList.filter((item) => item.id === id);

    
    
    const updateOption = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({checked:itemList[0].checked})
    }

    

    const reqUrl = `${API_URL}/${id}`
    console.log(reqUrl);

    const result = await apiRequest(reqUrl,updateOption);
    // if(result)
      // setFetchError(result);
   
  }

  async function handleDelete(id) {

    const newList = items.filter((item) => item.id !== id);
    setItems(newList);

    const deleteOption = {
      method : "DELETE"
    }

    const requestURL = `${API_URL}/${id}`;
    const result = await apiRequest(requestURL,deleteOption);
    if(result)
      setFetchError(result);

  }

  async function handleAddItem() {
    addRef.current.focus();
    if (text) {
    
      const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
      const addItem = {
        id : id.toString(),
        task: text,
        checked: false,
      };
      let list = [...items, addItem];

      setItems(list);

      const postOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addItem),
      };

      const result = await apiRequest(API_URL, postOption);
      setFetchError(result);

      // localStorage.setItem("to_do_list",JSON.stringify(list));
      setText("");
    }
  }

  function handleSearch() {
    setSearchBtn(!searchBtn);
    setSearchText(!searchText);

    setTimeout(() => {
      searchRef.current.focus();
      setSearch("");
    }, 500);
  }

  function handleKey(e) {
    if (e.key === "Enter") {
      handleAddItem();
    }
  }
  return (
    <>
      <Header heading="To-DO List" />

      <form>
        <AddItem
          text={text}
          setText={setText}
          addRef={addRef}
          handleAddItem={handleAddItem}
          handleKey={handleKey}
        />

        <SearchItem
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          searchBtn={searchBtn}
          searchRef={searchRef}
          searchText={searchText}
        />
      </form>

      <main>
        {isLoading && <Loading />}
        {fetchError && (
          <>
            <BiSolidError id="icon-error" />
            &nbsp;
            <p className="fetch_error">
              {" "}
              <span>Error:</span> {fetchError}
            </p>
          </>
        )}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.task.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            search = {search}
          />
        )}
      </main>

      <Footer name="ganesh kumar T" />
    </>
  );
};
