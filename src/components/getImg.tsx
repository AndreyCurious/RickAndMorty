import React, { useState } from "react";
import { PropsGetImg } from "../types/types"

const GetImg: React.FC<PropsGetImg> = ({ isLoading, currentCharacterImage }) => {
  if (isLoading) {
    return <img src="./images/loading.png" alt="loading" width={'223px'} height={'223px'} />
  }
  if (!isLoading && currentCharacterImage) {
    return <img src={currentCharacterImage} alt="currentCharacter" width={'223px'} height={'223px'} />
  }
  return <img src="./images/background-profile.png" alt="background" width={'223px'} height={'223px'} />

}

export default GetImg;