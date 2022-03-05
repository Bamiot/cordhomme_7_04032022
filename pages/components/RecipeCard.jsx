import styles from '../../styles/components/RecipeCard.module.scss'

export default function RecipeCard({ recipe }) {
  // prettier-ignore
  // eslint-disable-next-line no-unused-vars, prettier/prettier
  const {id, name, servings, ingredients, time, description, appliance, ustensils} = recipe
  return (
    <article className={styles.recipe}>
      <section>
        <div className={styles.header}>
          <h2>{name}</h2>
          <p>{time}</p>
        </div>
        <ul>{ingredients.map((ing) => ing.ingredient)}</ul>
        <p>{description}</p>
      </section>
    </article>
  )
}
