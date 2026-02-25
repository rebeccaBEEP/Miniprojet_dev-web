// ControlPanel : le panneau de contrôle pour choisir les objectifs et les paramètres
// C'est le composant le plus complexe, il gère la validation des inputs et l'état de la sélection


import { useState } from 'react'
import type { Objectif, ObjectifId, Parametres } from '../types'

// Données des objectifs (pas hardcodées dans le tableau)

const OBJECTIFS: Objectif[] = [
  { id: 'sedentaire',     label: 'Sédentaire',                        minRatio: 0.8, maxRatio: 1.0 },
  { id: 'endurance',      label: 'Endurance',                         minRatio: 1.2, maxRatio: 1.6 },
  { id: 'conservation',   label: 'Conservation de la masse musculaire',minRatio: 1.6, maxRatio: 1.8 },
  { id: 'priseDeMasse',   label: 'Prise de masse musculaire',         minRatio: 1.8, maxRatio: 2.2 },
]

// Props : la fonction appelée quand l'utilisateur clique sur "Générer"

type ControlPanelProps = {
  onGenerer: (parametres: Parametres, objectifs: Objectif[]) => void
}

function ControlPanel({ onGenerer }: ControlPanelProps) {
  const [objectifsSelectionnes, setObjectifsSelectionnes] = useState<ObjectifId[]>([])
  const [poidsMin, setPoidsMin] = useState<number>(50)
  const [poidsMax, setPoidsMax] = useState<number>(100)
  const [nombreLignes, setNombreLignes] = useState<number>(6)

  // Ajoute ou retire un objectif de la sélection

  function toggleObjectif(id: ObjectifId) {
    setObjectifsSelectionnes(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    )
  }

  function handleGenerer() {
  if (aDesErreurs) return
  onGenerer(
    { objectifsSelectionnes, poidsMin, poidsMax, nombreLignes },
    OBJECTIFS
  )
}

  // Validation des inputs : on vérifie que les valeurs sont cohérentes avant de permettre à l'utilisateur de générer le tableau

const erreurs: string[] = []
if (poidsMin <= 0) erreurs.push('Le poids minimum doit être positif.')
if (poidsMax <= 0) erreurs.push('Le poids maximum doit être positif.')
if (poidsMin >= poidsMax) erreurs.push('Le poids minimum doit être inférieur au poids maximum.')
if (nombreLignes < 2) erreurs.push('Le nombre de lignes doit être au moins 2.')
if (objectifsSelectionnes.length === 0) erreurs.push('Veuillez sélectionner au moins un objectif.')

const aDesErreurs = erreurs.length > 0

  return (
    <div className='control-panel'>
      <h2>Paramètres</h2>

      {/* Cases à cocher pour les objectifs */}
      <div className='objectifs'>
        <p>Objectifs :</p>
        {OBJECTIFS.map(obj => (
          <label key={obj.id}>
            <input
              type="checkbox"
              checked={objectifsSelectionnes.includes(obj.id)}
              onChange={() => toggleObjectif(obj.id)}
            />
            {obj.label}
          </label>
        ))}
      </div>

      {/* Inputs numériques */}
      <div className='inputs'>
        <label>
          Poids minimum (kg) :
          <input type="number" value={poidsMin} onChange={e => setPoidsMin(Number(e.target.value))} />
        </label>
        <label>
          Poids maximum (kg) :
          <input type="number" value={poidsMax} onChange={e => setPoidsMax(Number(e.target.value))} />
        </label>
        <label>
          Nombre de lignes :
          <input type="number" value={nombreLignes} onChange={e => setNombreLignes(Number(e.target.value))} />
        </label>
      </div>
        {/* pour les Messages d'erreur */}
        {erreurs.map((erreur, index) => (
           <p key={index} className='erreur'>{erreur}</p>
             ))}

        <button onClick={handleGenerer} disabled={aDesErreurs}>
                 Générer le tableau
        </button>



    </div>
  )
}

export default ControlPanel
export { OBJECTIFS }