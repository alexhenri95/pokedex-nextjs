import { Card, Grid } from "@nextui-org/react"
import { FC } from "react"
import { useRouter } from 'next/router';

interface Props {
    pokeId: number
}

export const PokemonFavoriteCard: FC<Props> = ({pokeId}) => {

    const router = useRouter()

    const onFavoriteClick = () => {
        router.push(`/pokemon/${pokeId}`)
    }

    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokeId}>
            <Card isHoverable isPressable css={{padding: 10}} onClick={ onFavoriteClick }>
                <Card.Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokeId}.svg`}
                    width={'100%'} height={150}
                />
            </Card>
        </Grid>
    )
}
