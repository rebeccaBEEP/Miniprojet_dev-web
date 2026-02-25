// Ce composant génère un fichier CSV à partir des paramètres et objectifs sélectionnés
// Il est appelé depuis App.tsx, juste en dessous du tableau

import type { Objectif, Parametres } from '../types'

type ExportCSVProps = {
  parametres: Parametres
  objectifs: Objectif[]
}

function ExportCSV({ parametres, objectifs }: ExportCSVProps) {
  const { poidsMin, poidsMax, nombreLignes, objectifsSelectionnes } = parametres

  const objectifsFiltres = objectifs.filter(o => objectifsSelectionnes.includes(o.id))

  function genererCSV() {
    // Ligne d'en-tête
    const entete = ['Poids (kg)', ...objectifsFiltres.map(o => o.label)].join(';')

    // Lignes de données
    const pas = (poidsMax - poidsMin) / (nombreLignes - 1)
    const lignes = []

    for (let i = 0; i < nombreLignes; i++) {
      const poids = Math.round(poidsMin + pas * i)
      const cellules = objectifsFiltres.map(obj => {
        const min = Math.round(poids * obj.minRatio)
        const max = Math.round(poids * obj.maxRatio)
        return `${min} - ${max} g/jour`
      })
      lignes.push([`${poids} kg`, ...cellules].join(';'))
    }

    // Assemblage du contenu CSV
    const contenu = [entete, ...lignes].join('\n')

    // Téléchargement du fichier
    const blob = new Blob([contenu], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const lien = document.createElement('a')
    lien.href = url
    lien.download = 'besoins_proteines.csv'
    lien.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button onClick={genererCSV} className='btn-export'>
      Exporter en CSV
    </button>
  )
}

export default ExportCSV