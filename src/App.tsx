// App : le composant principal de l'application

import './App.css'

import { useState } from 'react'
import ControlPanel from './components/ControlPanel'
import ProteinTable from './components/ProteinTable'
import type { Objectif, Parametres } from './types'
import ExportCSV from './components/ExportCsv'

function App() {
  // On stocke les paramètres et objectifs quand l'utilisateur clique sur "Générer"

  const [parametres, setParametres] = useState<Parametres | null>(null)
  const [objectifs, setObjectifs] = useState<Objectif[]>([])

  // Cette fonction est passée à ControlPanel
  // Elle est appelée quand l'utilisateur clique sur "Générer"
  
  function handleGenerer(params: Parametres, objs: Objectif[]) {
    setParametres(params)
    setObjectifs(objs)
  }

  return (
    <div className='app'>
      <h1>Générateur de besoins en protéines</h1>

      {/* Le panneau de contrôle reçoit la fonction handleGenerer */}
      <ControlPanel onGenerer={handleGenerer} />

      {/* Le tableau s'affiche uniquement si l'utilisateur a cliqué sur Générer */}
    {parametres && (
  <>
    <ProteinTable parametres={parametres} objectifs={objectifs} />
    <ExportCSV parametres={parametres} objectifs={objectifs} />
  </>
)}      
    </div>
  )
}

export default App