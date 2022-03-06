import { useState, useRef } from 'react'
import styles from '../../styles/components/SearchTag.module.scss'
import AngleIc from './icons/AngleIc'

export default function SearchTag({ label, color, dataSet, onSelect }) {
  const [deploy, setDeploy] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const inputRef = useRef(null)

  const collapse = () => {
    setDeploy(false)
    setQuery('')
    if (selected) {
      console.log('selected', selected)
      onSelect(selected)
      setSelected(null)
    }
  }

  return (
    <div className={[styles.wrapper, deploy && styles.deploy].join(' ')}>
      <div
        className={styles.container}
        style={{ backgroundColor: color }}
        onClick={() => {
          if (!deploy) {
            setDeploy(!deploy)
            inputRef.current.focus()
          }
        }}
      >
        <div className={styles.header}>
          <input
            type="text"
            placeholder={`Rechercher un ${label}`}
            value={query}
            ref={inputRef}
            className={!deploy && styles.hide}
            onBlur={collapse}
            onChange={(e) => setQuery(e.target.value)}
          />
          {!deploy && <p>{label}</p>}
          <span
            className={[styles.arrow, deploy && styles.active].join(' ')}
            onClick={() => {
              setDeploy(!deploy)
              !deploy && inputRef.current.focus()
            }}
          >
            <AngleIc />
          </span>
        </div>
        {deploy && (
          <ul className={styles.content}>
            {dataSet
              ?.filter(
                (item) =>
                  query.length < 3 ||
                  item
                    .toLowerCase()
                    .removeAccents()
                    .includes(query.toLowerCase().removeAccents())
              )
              .filter((val, i) => i < 30)
              .map((item, i) => (
                <li
                  key={i}
                  onMouseEnter={() => setSelected(item)}
                  onMouseLeave={() => setSelected(null)}
                >
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}
