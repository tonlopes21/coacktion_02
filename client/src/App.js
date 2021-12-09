import React, { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
// import Card from "./components/cards/cards";

export default function App() {
  const [values, setValues] = useState();
  const [listCard, setListCard] = useState([]);
  console.log(listCard);
  const handleRegisterBook = () => {
    Axios.post("http://localhost:3000/register", {
      name: values.name,
      author: values.author,
      category: values.category,
    }).then(() => {
      Axios.post("http://localhost:3000/search", {
        name: values.name,
        author: values.author,
        category: values.category,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values.name,
            author: values.author,
            category: values.category,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3000/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Biblioteca v.1</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Autor"
          name="author"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="category"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterBook} className="register-button">
          Cadastrar
        </button>
      </div>

      {/* {listCard.map((val) => (
        // <Card
        //   listCard={listCard}
        //   setListCard={setListCard}
        //   key={val.id}
        //   id={val.id}
        //   name={val.name}
        //   author={val.author}
        //   category={val.category}
        // />
      ))} */}
    </div>
  );
}