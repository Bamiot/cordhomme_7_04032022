import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Index.module.scss'
import cssVar from '../styles/sass/_variables.module.scss'
import Searchbar from './components/Searchbar'
import RecipeCard from './components/RecipeCard'
import SearchTag from './components/SearchTag'
import CircleCrossIc from './components/icons/CircleCrossIc'
import { useState } from 'react'

import recipes from '../data/recipes.json'

String.prototype.capitalize = function () {
  return (
    this.toLocaleLowerCase().charAt(0).toUpperCase() +
    this.toLocaleLowerCase().slice(1)
  )
}
String.prototype.removeAccents = function () {
  return this.replace(/(é|è|ê|ë)/g, 'e')
    .replace(/(à|ä|â)/g, 'a')
    .replace(/(ù|ü|û)/g, 'u')
    .replace(/(î|ï)/g, 'i')
    .replace(/(ô|ö)/g, 'o')
    .replace(/(ÿ)/g, 'y')
    .replace(/(ñ)/g, 'n')
    .replace(/(ç)/g, 'c')
    .replace(/(À|Ä|Â)/g, 'A')
    .replace(/(È|Ë|Ê)/g, 'E')
    .replace(/(Ù|Ü|Û)/g, 'U')
    .replace(/(Î|Ï)/g, 'I')
    .replace(/(Ô|Ö)/g, 'O')
    .replace(/(Ÿ)/g, 'Y')
    .replace(/(Ñ)/g, 'N')
    .replace(/(Ç)/g, 'C')
}

Array.prototype.removeDuplicates = function () {
  return this.filter((item, index) => this.indexOf(item) === index)
}
Array.prototype.sortAlphaAndRemoveDuplicates = function () {
  return this.removeDuplicates()
    .sort((a, b) => a.localeCompare(b, 'fr'))
    .filter(
      (value, index, self) =>
        index === 0 ||
        self[index - 1].localeCompare(value.slice(0, -1), 'fr') !== 0
    )
    .filter(
      (value, index, self) =>
        index === 0 || self[index - 1].removeAccents() !== value.removeAccents()
    )
}

const ingredients = recipes
  .reduce((acc, curr) => acc.concat(curr.ingredients), [])
  .map((ingredient) => ingredient.ingredient.capitalize())
  .sortAlphaAndRemoveDuplicates()

const appareils = recipes
  .map((recipe) => recipe.appliance.capitalize())
  .sortAlphaAndRemoveDuplicates()

const ustensils = recipes
  .reduce((acc, curr) => acc.concat(curr.ustensils), [])
  .map((ustensil) => ustensil.capitalize())
  .sortAlphaAndRemoveDuplicates()

function strincludes(str, query) {
  for (let i = 0; i < str.length; i++)
    if (str.substring(i, i + query.length).toLowerCase() === query) return true
  return false
}

const filterRecipesByQuery = filterRecipesByQueryHybrid

function filterRecipesByQueryHybrid(recipes, query) {
  const results = []
  for (const recipe of recipes) {
    let ingredients = ''
    for (const ingredient of recipe.ingredients)
      ingredients += ` ${ingredient.ingredient.toLowerCase()}`
    if (
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      ingredients.includes(query)
    )
      results.push(recipe)
  }
  return results
}

// eslint-disable-next-line no-unused-vars
const filterRecipesByQueryFonctional = (recipes, query) =>
  recipes.filter(
    (recipe) =>
      recipe.name.toLocaleLowerCase().includes(query) ||
      recipe.description.toLocaleLowerCase().includes(query) ||
      recipe.ingredients
        .reduce((prev, curr) => prev.concat(curr.ingredient), [])
        .join(' ')
        .toLocaleLowerCase()
        .includes(query)
  )

// eslint-disable-next-line no-unused-vars
function filterRecipesByQueryLoop(recipes, query) {
  const results = []
  for (const recipe of recipes) {
    const name = recipe.name.toLowerCase()
    const description = recipe.description.toLowerCase()
    let ingredients = ''
    for (const ingredient of recipe.ingredients)
      ingredients += ` ${ingredient.ingredient.toLowerCase()}`
    if (
      strincludes(name, query) ||
      strincludes(description, query) ||
      strincludes(ingredients, query)
    )
      results.push(recipe)
  }
  return results
}

function filterRecipesByTag(recipes, tags) {
  if (tags.length === 0) return recipes
  const results = []
  for (const recipe of recipes) {
    let findTags = 0
    for (const tag of tags) {
      if (tag.type === 'appliance') {
        if (
          recipe.appliance.removeAccents().toLowerCase() ===
          tag.name.removeAccents().toLowerCase()
        )
          findTags++
      }
      if (tag.type === 'ingredients') {
        for (const ingredient of recipe.ingredients) {
          if (
            ingredient.ingredient.removeAccents().toLowerCase() ===
            tag.name.removeAccents().toLowerCase()
          )
            findTags++
        }
      }
      if (tag.type === 'ustensils') {
        for (const ustensil of recipe.ustensils) {
          if (
            ustensil.removeAccents().toLowerCase() ===
            tag.name.removeAccents().toLowerCase()
          )
            findTags++
        }
      }
    }
    if (findTags === tags.length) results.push(recipe)
  }
  return results
}

export default function Home() {
  const [tags, setTags] = useState([])
  const [filterQuery, setFilterQuery] = useState('')

  const filteredRecipes = filterRecipesByTag(
    filterQuery.length > 2
      ? filterRecipesByQuery(recipes, filterQuery)
      : recipes,
    tags
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Les petits plats</title>
      </Head>
      <header className={styles.header}>
        <h1>
          <Image
            src="/logo.png"
            alt="Les petits plats"
            layout="intrinsic"
            height="100px"
            width="300px"
          />
        </h1>
      </header>
      <main className={styles.main}>
        <div className={styles.search}>
          <Searchbar
            onSubmit={(query) => {
              console.log(query)
            }}
            onChange={(query) => {
              setFilterQuery(query)
            }}
          />
          <ul className={styles.tags}>
            {tags.map((tag, i) => (
              <li className={styles[tag.type]} key={i}>
                {tag.name}
                <CircleCrossIc
                  onClick={() => {
                    setTags(tags.filter((t, j) => i !== j) || [])
                  }}
                />
              </li>
            ))}
          </ul>
          <div className={styles.tagSearchers}>
            <SearchTag
              label="Ingrédients"
              color={cssVar.secondaryColor}
              dataSet={ingredients.filter(
                (e) => !tags.map((t) => t.name).includes(e)
              )}
              onSelect={(tag) => {
                setTags([...tags, { name: tag, type: 'ingredients' }])
              }}
            />
            <SearchTag
              label="Appareils"
              color={cssVar.ternaryColor}
              dataSet={appareils.filter(
                (e) => !tags.map((t) => t.name).includes(e)
              )}
              onSelect={(tag) => {
                setTags([...tags, { name: tag, type: 'appliance' }])
              }}
            />
            <SearchTag
              label="Ustensiles"
              color={cssVar.primaryColor}
              dataSet={ustensils.filter(
                (e) => !tags.map((t) => t.name).includes(e)
              )}
              onSelect={(tag) => {
                setTags([...tags, { name: tag, type: 'ustensils' }])
              }}
            />
          </div>
        </div>
        <ul className={styles.recipes}>
          {filteredRecipes.map((recipe, i) => (
            <li key={i} className={styles.recipe}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
