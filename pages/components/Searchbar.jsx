import { useState } from 'react'
import styles from '../../styles/components/Searchbar.module.scss'
import SearchIc from './icons/SearchIc'

export default function Searchbar({ onSubmit, onChange }) {
  const [searchQuery, setSearchQuery] = useState('')

  function setQuery(q) {
    setSearchQuery(q)
    onChange(q)
  }

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
        onChange={(e) => setQuery(e.target.value)}
        value={searchQuery}
        placeholder="Rechercher une recette"
      />
      <button type="submit">
        <SearchIc />
      </button>
    </form>
  )
}
