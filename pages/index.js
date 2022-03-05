import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Index.module.scss'
// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import Searchbar from './components/Searchbar'
import RecipeCard from './components/RecipeCard'
import recipes from '../data/recipes.json'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Les petits plats</title>
      </Head>
      <header className={styles.header}>
        <h1>
          <figure>
            <Image
              src="/logo.png"
              alt="Les petits plats"
              layout="intrinsic"
              height="100px"
              width="300px"
            />
          </figure>
        </h1>
        <Searchbar
          onSubmit={(query) => {
            console.log(query)
          }}
        />
      </header>
      <main className={styles.main}>
        <ul>
          {recipes.map((recipe, i) => (
            <li key={i}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
