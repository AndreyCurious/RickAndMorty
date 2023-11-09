import React, { useState } from "react";
import { CharactersState, PropsGetInfo } from "../types/types"
import GetImg from "./getImg";
import axios from "axios"

const getClass = (characterOption: string) => {
  console.log(characterOption)
  switch (characterOption) {
    case 'unknown':
      return 'opacity'
    case 'Dead':
      return 'danger'
    default:
      return 'black';
  }
}


const GetInfo: React.FC<PropsGetInfo> = ({ error, currentCharacter }) => {
  if (error) {
    return <h1 className="title danger">{error}
    </h1>
  }
  if (currentCharacter && !error) {
    return (
      <>
        <h1 className="title">{currentCharacter?.name}</h1>
        <ul className="options">
          <li>Species<span className={getClass(currentCharacter?.species)}>{currentCharacter?.species}</span></li>
          <li>Type<span className={getClass(currentCharacter?.type)}>{currentCharacter?.type}</span></li>
          <li>Location<span className={getClass(currentCharacter?.location.name)}>{currentCharacter?.location.name}</span></li>
          <li>Origin<span className={getClass(currentCharacter?.origin.name)}>{currentCharacter?.origin.name}</span></li>
          <li>Status<span className={getClass(currentCharacter?.status)}>{currentCharacter?.status}</span></li>
        </ul>
      </>
    )
  }
  return <></>
}

const Search: React.FC = () => {
  const [characters, setCharacters] = useState<CharactersState[]>([]);
  const [characterNumber, setCharacterNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentCharacter, setCurrentCharacter] = useState<CharactersState | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (characters.find((character) => character.id === characterNumber)) {
        throw new Error('Such a character already exists');
      }
      const response = await axios(`https://rickandmortyapi.com/api/character/${characterNumber}`);

      setError(null);
      setTimeout(() => {
        setIsLoading(false);
        setCharacters([...characters, response.data]);
        setCurrentCharacter(response.data);

        console.log(currentCharacter)
      }, 1000)
      setCharacterNumber(null)
      console.log(response)

    } catch (error) {
      console.log(error.name === 'AxiosError')
      if (error.name === 'AxiosError') {
        setError('Character not found')
      } else {
        setError(error.message);
      }
      setIsLoading(false);
      setCurrentCharacter(null);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setCharacterNumber(Number(event.currentTarget.value));
  }

  const clearCharacters = () => {
    setCharacters([]);
    setCurrentCharacter(null);
  }


  return (
    <>
      <div className="search">
        <div className="line">
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange} placeholder="Enter any Number" type="text" />
            <button>Search</button>
          </form>
        </div>
        {characters.length ?
          <button onClick={clearCharacters}>Clear All</button>
          :
          <></>
        }
      </div>
      <div className="mainBody">
        <div className="left">
          <div>
            <GetImg isLoading={isLoading} currentCharacterImage={currentCharacter?.image} />
          </div>
          <div className="info">
            <GetInfo error={error} currentCharacter={currentCharacter} />
          </div>
        </div>
        <div className="right ">
          {characters.map((character) => (
            <img onClick={() => setCurrentCharacter(character)} className={character.id === currentCharacter?.id ? 'active' : 'notActive'} key={character.id} src={character.image} alt="miniCharacter" width={'60px'} height={'60px'} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Search;