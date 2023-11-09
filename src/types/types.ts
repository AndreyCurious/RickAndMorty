interface Option {
  name: string
}

export interface CharactersState {
  id: number,
  name: string,
  species: string,
  type: string,
  location: Option,
  origin: Option,
  status: string,
  image: string
}

export interface PropsGetInfo {
  error: null | string,
  currentCharacter: CharactersState | null,
}

export interface PropsGetImg {
  isLoading: boolean,
  currentCharacterImage: string | undefined,
}