import { Container, Image, Text } from "@nextui-org/react"

export const NoFavorites = () => {
    return (
        <Container css={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 100px)',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center'
        }}>
            <Text h3>No hay favoritos</Text>
        </Container>
    )
}
