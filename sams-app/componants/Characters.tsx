import React from 'react';
import Image from 'next/image';
import styles from '../styles/Characters.module.css'

interface Props {
    characters: any;
}

const Character = ({characters}:Props) => {

    return (
        <div className={styles.grid}>
           {characters.map((character:any) => {
               return (
                   <div className={styles.card} key={character.id}>
                       <Image src={character.image} width={300} height={300}/>
                       <h4 className={styles.title}>{character.name}</h4>
                       <p>origin: {character.origin.name}<br/>location {character.location.name}</p>
                   </div>
               )
           })}     

        </div>
    )
}

export default Character;
