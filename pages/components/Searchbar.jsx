import { useState } from 'react'
import styles from '../../styles/components/Searchbar.module.scss'
import { SearchIc } from './Icons'

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('')
  return (
    <form
      className={styles.searchbar}
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(searchQuery)
      }}
    >
      <input
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        placeholder="Rechercher une recette"
      />
      <button type="submit">
        <SearchIc />
      </button>
    </form>
  )
}
