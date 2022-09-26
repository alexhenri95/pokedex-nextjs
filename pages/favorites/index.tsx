import { useEffect, useState } from "react"
import { FavoritePokemons, NoFavorites } from "../../components"
import { Layout } from "../../layouts"
import { localStorageFavorites } from "../../utilities"

const index = () => {

    const [favorites, setFavorites] = useState<number[]>([])

    useEffect(() => {
        setFavorites( localStorageFavorites.pokemons() )
    }, [])

    return (
        <Layout title="Favoritos">

            {
                favorites.length === 0
                    ? ( <NoFavorites/> )
                    : ( <FavoritePokemons pokemons={favorites}/> )
            }
            
        </Layout>
    )
}

export default index