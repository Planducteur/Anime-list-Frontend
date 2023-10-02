import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";
import AnimeCards from "../components/Home/AnimeCards";
import styled from "styled-components";
import axios from "axios";
import { Navigate } from 'react-router-dom';

function Home() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { height, width } = useWindowDimensions();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Récupérez le token JWT stocké dans le navigateur (à partir des cookies, du localStorage, etc.)
    const token = localStorage.getItem('token'); // Vous devrez adapter ceci à votre méthode de stockage
    
    // Effectuez une requête vers le serveur Symfony pour vérifier le token
    fetch('https://127.0.0.1:8000/api/check-token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
      if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Le token n'est pas valide, vous pouvez supprimer le token côté client ici
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          <Navigate to="/" />
        }
      })
      .catch(error => {
        console.error('Erreur lors de la vérification du token :', error);
        setIsAuthenticated(false);
      });
  }, []);

  
  
    return (
    <div>
      <HeadingWrapper>
            <Heading>
            <span>Trending</span> Now
            </Heading>
            <Links to="/popular/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="TRENDING_DESC" />


          <HeadingWrapper>
            <Heading>
              <span>All Time</span> Popular
            </Heading>
            <Links to="/popular/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="POPULARITY_DESC" />

          
          
          <HeadingWrapper>
            <Heading>
            <span>Top 100</span> Anime
            </Heading>
            <Links to="/popular/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="SCORE_DESC" />
          
          
          
          
          
          <HeadingWrapper>
            <Heading>
            <span>All Time</span> Favourite
            </Heading>
            <Links to="/popular/1">View All</Links>
          </HeadingWrapper>
          <AnimeCards count={width <= 600 ? 7 : 15} criteria="FAVOURITES_DESC" />
        </div>
    );
  }
  const Links = styled(Link)`
  font-size: 1.1rem;  
  font-family: "Gilroy-Medium", sans-serif;
  @media screen and (max-width: 600px) {
    font-size: 1rem;
    font-family: "Gilroy-Medium", sans-serif;
  }
`;

  const Heading = styled.p`
  font-size: 1.8rem;
  font-weight: 200;
  margin-top: 1rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

  const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  @media screen and (max-width: 600px) {
    margin-top: 1rem;
  }
`;
  export default Home;