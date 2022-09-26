import React, { useState } from 'react'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import { pokeApi } from '../../api'
import { Pokemon, PokemonListResponse } from '../../interfaces'
import { Layout } from '../../layouts'
import { getPokemonInfo, localStorageFavorites } from '../../utilities'
import confetti from 'canvas-confetti'

interface Props {
    pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({pokemon}) => {
    
    const [ isInFavorites, setIsInFavorites ] = useState(localStorageFavorites.existsInFavorites(pokemon.id))

    const onToggleFavorites = () => {
        localStorageFavorites.toggleFavorites(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if (!isInFavorites) {
            confetti({
                zIndex: 999,
                angle: -100,
                particleCount: 100,
                spread: 160,
                origin: { 
                    x: 1,
                    y: 0 
                }
            });
        }
    }    

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px'}} gap={2}>
                <Grid xs={12} sm={4} >
                    <Card isHoverable css={{padding: '30px'}} >
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'} alt={pokemon.name} width="100%" height={200}/>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{display: 'flex', justifyContent:'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button onClick={ onToggleFavorites } color="gradient" ghost={!isInFavorites}>
                                {
                                    isInFavorites ? 'En favoritos' : 'Guardar en favoritos'
                                }
                            </Button>
                        </Card.Header>

                        <Card.Body>
                            <Text size={25}>Sprites</Text>
                            <Container display='flex' css={{display: 'flex', justifyContent:'space-between'}} >
                                <Image 
                                    src={pokemon.sprites.front_default} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.back_default} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.front_shiny} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                                <Image 
                                    src={pokemon.sprites.back_shiny} 
                                    alt={pokemon.name} 
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=50')
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name )

    return {
        paths: pokemonNames.map( name => ({
            params: {name}
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { name } = params as { name: string };

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}



export default PokemonByNamePage