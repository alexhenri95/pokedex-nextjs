import { FC } from "react"
import Head from "next/head"
import { Navbar } from '../components'

interface props {
    children: React.ReactNode,
    title?: String
}

const origin = (typeof window === 'undefined' ? '': window.location.origin)

export const Layout: FC<props> = ({ children, title} ) => {

    return (
        <>
            <Head>
                <title>Pokemon | { title || 'Sin título' }</title>
                <meta name="author" content="alex henriquez"/>
                <meta name="description" content="Información de pokemon"/>
                <meta name="keywords" content="Pokemon, pokedex, picachu"/>

                <meta property="og:title" content={`Informacion sobre ${title}`} />
                <meta property="og:description" content={`Esta es la página sobre ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar/>

            <main style={{
                padding: '10px 20px'
            }}>
                { children }
            </main>
        </>
    )
}

