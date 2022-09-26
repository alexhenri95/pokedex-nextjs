import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react';
import { Layout } from '../layouts';
import { pokeApi } from '../api';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import {PokemonCard} from '../components';

interface Props {
    pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({pokemons}) => {
    
    return (
        <Layout title="Listado de pokemons">
            <Grid.Container gap={2} justify='flex-start'>
                {
                    pokemons.map( (pokemon) => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ) )
                }
            </Grid.Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    
    const {data} = await pokeApi.get<PokemonListResponse>('/pokemon?limit=50')

    const pokemons: SmallPokemon[] = data.results.map((p, i ) => ({
        ...p,
        id: i + 1,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg` 
    }))
    
    return {
        props: {
            pokemons
        }
    }
}

export default HomePage