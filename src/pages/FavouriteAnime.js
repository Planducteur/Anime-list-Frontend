import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function FavouriteAnime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (!userId) {
      // Gérer le cas où l'ID de l'utilisateur n'est pas défini dans localStorage
      return;
    }

    axios
      .get(`https://127.0.0.1:8000/api/animes?userid=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      {data.map((item, i) => (
        <Card key={i}>
          <img src={item.Liensimg} alt={item.Liensimg} />
          <p>{item.Nom}</p>
        </Card>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const Card = styled.div`
  width: 200px; /* Largeur fixe pour chaque élément */
  margin: 10px;
  img {
    width: 100%;
    height: 235px; /* Hauteur fixe pour toutes les images */
    border-radius: 0.5rem;
    object-fit: cover;
    cursor: pointer;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
    position: relative;
  }
`;

export default FavouriteAnime;
