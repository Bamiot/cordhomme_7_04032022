import styles from '../../styles/components/RecipeCard.module.scss'
import TimeIc from './Icons/TimeIc'

function parseUnit(unit) {
  const unitMap = {
    ml: ['ml', 'milliliter', 'millilitre', 'milliliters', 'millilitres'],
    l: ['l', 'liter', 'litre', 'liters', 'litres'],
    g: ['g', 'gram', 'grams', 'gramme', 'grammes'],
    kg: ['kg', 'kilogram', 'kilograms', 'kilogramme', 'kilogrammes'],
    cl: ['cl', 'centiliter', 'centilitre', 'centiliters', 'centilitres'],
  }
  for (const key in unitMap)
    if (unitMap[key].includes(unit.toLowerCase())) return key
  return ` ${unit}`
}

function parseQuantity(quantity) {
  const quantityMap = {
    '½': ['½', '1/2', '0.5'],
    '¼': ['¼', '1/4', '0.25'],
    '¾': ['¾', '3/4', '0.75'],
  }
  for (const key in quantityMap)
    if (quantityMap[key].includes(`${quantity}`)) return key
  return quantity
}

export default function RecipeCard({ recipe }) {
  // prettier-ignore
  // eslint-disable-next-line no-unused-vars, prettier/prettier
  const {id, name, servings, ingredients, time, description, appliance, ustensils} = recipe
  return (
    <article className={styles.recipe}>
      <section>
        <div className={styles.header}>
          <h2>{name}</h2>
          <p>
            <TimeIc />
            {`${time} min`}
          </p>
        </div>
        <div className={styles.content}>
          <ul>
            {ingredients.map((ing, i) => (
              <li key={i}>
                <b>{ing.ingredient}</b>
                {ing.quantity && `: ${parseQuantity(ing.quantity)}`}
                {ing.quantite && `: ${parseQuantity(ing.quantite)}`}
                {ing.unit && parseUnit(ing.unit)}
                {ing.unite && parseUnit(ing.unite)}
              </li>
            ))}
          </ul>
          <p>{description}</p>
        </div>
      </section>
    </article>
  )
}
