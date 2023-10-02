import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Badge,
  Card,
  CardBody,
  Tooltip,
  Progress,
  CardFooter,
  Image,
  useDisclosure,
  Button,
} from "@nextui-org/react";

import "swiper/css";
import DetailCard from "../Functions/DetailCard";












function AnimeCard(props) {
  const [data, setData] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    var query = `
    query ($id: Int, $page: Int, $perPage: Int, 
      $sort: [MediaSort]) {
        Page (page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }

          media (id: $id, sort: $sort,type: ANIME) {
            id
            title {
              romaji
            }
            bannerImage
				    coverImage {
					          medium
        	          large
        	          extraLarge
				    }
				    description
				    episodes
          }
        }
      }
    `;

    var variables = {
      page: 1,
      perPage: props.count,
      sort: props.criteria,
    };

    var url = "https://graphql.anilist.co";
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

    try {
      const response = await axios.post(
        url,
        {
          query: query,
          variables: variables,
        },
        options
      );
      const data = handleResponse(response);
      handleData(data);
    } catch (error) {
      handleError(error);
    }
  }

  function handleResponse(response) {
    if (!response.data || response.data.errors) {
      throw new Error(`API error!`);
    }
    return response.data;
  }

  function handleData(data) {
    // Process the data here
    setData(data.data.Page.media);
  }

  function handleError(error) {
    // Handle the error here
    console.error("An error occurred:", error);
  }

  const handleBadgeClick = (id,title,img) => {
   // Remplacez les valeurs suivantes par les données de l'anime que vous souhaitez créer
   
  const userid = parseInt(localStorage.getItem('userid'), 10);
  const newAnimeData = {
    Nom: title,
    Animeid: id,
    Liensimg: img,// L'ID de l'anime que vous souhaitez créer
    userid: userid
  };
console.log(newAnimeData);

axios.get(`https://127.0.0.1:8000/api/animes/search/Animeid/${id}/userid/${userid}`,
  {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  })
    .then((response) => {
      if(response.status == 200){
        console.log("Anime existe déjà", response.data);
      }
      
    })
    .catch((error) => {
      axios
      .post("https://127.0.0.1:8000/api/animes", newAnimeData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then((response) => {
        console.log("Anime créé avec succès :", response.data);
        // Mettez à jour votre interface utilisateur ou effectuez d'autres actions après la création réussie
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'anime :", error);
        // Gérez les erreurs ici, par exemple, affichez un message d'erreur à l'utilisateur
      });
    });

 /* 
*/

  };



  return (
    <Swiper
      spaceBetween={35}
      slidesPerView={10}
      scrollbar={{
        hide: false,
      }}
      breakpoints={{
        "@0.00": {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        "@0.75": {
          slidesPerView: 4,
          spaceBetween: 20,
        },
        "@1.00": {
          slidesPerView: 4,
          spaceBetween: 35,
        },
        "@1.30": {
          slidesPerView: 5,
          spaceBetween: 35,
        },
        "@1.50": {
          slidesPerView: 7,
          spaceBetween: 35,
        },
        "@1.75": {
          slidesPerView: 9,
          spaceBetween: 35,
        },
      }}
      /*  //a utiliser si on veut actioner des actions
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      */
    >
      {data.map((item, i) => (
        <SwiperSlide key={i}>
          <Wrapper>
            <Badge content={item.episodes} color="primary">
            <button onClick={() => handleBadgeClick(item.id,item.title.romaji,item.coverImage.large)}>
      <Badge
        content="❤️"
        variant="flat"
        placement="top-left"
        style={{
          border: "none", // Supprime les bordures
          fontSize: "24px", // Augmente la taille du contenu du badge
          background: "transparent", // Rend le fond transparent
          cursor: "pointer", // Affiche un curseur de pointeur pour indiquer la cliquabilité
        }}
      >
        {/* Votre contenu ici */}
              <Tooltip
                content={
                  <Progress
                    aria-label="Loading..."
                    value={60}
                    className="max-w-md"
                    style={{ width: "100px" }}
                  />
                }
              >
                <img
                  onClick={() => setOpenIndex(i)}
                  src={item.coverImage.large}
                  alt=""
                />
              </Tooltip>
            </Badge>
            </button>
            </Badge>
            <Tooltip
              placement="top-start"
              style={{
                maxWidth: "150px",
              }}
              content={item.title.romaji}
            >
              <p>{item.title.romaji}</p>
            </Tooltip>

            <DetailCard
              isOpen={openIndex === i}
              onClose={() => setOpenIndex(null)}
              name={item.title.romaji}
              episods={item.episodes}
            />
          </Wrapper>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
const Wrapper = styled.div`
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    object-fit: cover;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
    }
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 160px;
    }
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
export default AnimeCard;
