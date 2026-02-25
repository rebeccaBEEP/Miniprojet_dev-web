// ProteinTable : le tableau qui affiche les plages de protéines en fonction du poids et des objectifs
// C'est un composant "dumb" : il reçoit des données et les affiche, sans gérer de logique complexe

import type { Objectif, Parametres } from '../types'

type ProteinTableProps = {
  parametres: Parametres
  objectifs: Objectif[]
}

function ProteinTable({ parametres, objectifs }: ProteinTableProps) {
  const { poidsMin, poidsMax, nombreLignes, objectifsSelectionnes } = parametres

  // On filtre uniquement les objectifs sélectionnés par l'utilisateur

  const objectifsFiltres = objectifs.filter(o => objectifsSelectionnes.includes(o.id))

  // On calcule les poids à afficher
  // On veut un nombre de lignes égal à nombreLignes, avec des poids allant de poidsMin à poidsMax

  function calculerPoids(): number[] {
    const poids: number[] = []
    const pas = (poidsMax - poidsMin) / (nombreLignes - 1)
    for (let i = 0; i < nombreLignes; i++) {
      poids.push(Math.round(poidsMin + pas * i))
    }
    return poids
  }

  const lignesPoids = calculerPoids()

  return (
    <div className='table-wrapper'>
      <table>
        {/* En-tête du tableau */}
        <thead>
          <tr>
            <th>Poids (kg)</th>
          {objectifsFiltres.map(obj => (
            <th key={obj.id}>{obj.label}</th>
          ))}
        </tr>
      </thead>

      {/* Corps du tableau */}
      <tbody>
        {lignesPoids.map(poids => (
          <tr key={poids}>
            <td>{poids} kg</td>
            {objectifsFiltres.map(obj => {
              const min = Math.round(poids * obj.minRatio)
              const max = Math.round(poids * obj.maxRatio)
              return (
                <td key={obj.id}>
                  {min} – {max} g/jour
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default ProteinTable