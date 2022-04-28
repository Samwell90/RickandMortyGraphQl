import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Character from '../componants/Characters';

export default function Home(results: any) {
  const initialState = results;
  const [characters, setCharacters] = useState(initialState.characters); 
  const [search, setSearch] = useState(""); 

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1>Rick and Morty</h1>
        <form className={styles.search} onSubmit={async (event) => {
          event.preventDefault();
          const results = await fetch("/api/searchCharacters", {
            method: "post",
            body: search,
          })
          const {characters, error} = await results.json();
          if(error){
            console.log(error)
          } else {
            setCharacters(characters)
          }
        }
        }>
          <input type="text" placeholder='search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
          <button disabled={search === ""} type='submit'>Search</button>
          <button disabled={search === ""} onClick={async () => {setSearch(""); setCharacters(initialState.characters)}}>reset</button>
        </form>
        <Character characters={characters}/>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql/",
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            name
            id
            location {
              name
              id
            }
            image
            origin {
              name
              id
            }
            episode {
              id
              episode
              air_date
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
 
