// Les 4 objectifs possibles  
// On définit les types pour mieux structurer les données et éviter les erreurs

export type ObjectifId = 'sedentaire' | 'endurance' | 'conservation' | 'priseDeMasse'

// La structure d'un objectif 

export type Objectif = {
  id: ObjectifId
  label: string       // nom affiché à l'utilisateur
  minRatio: number    // g de protéines par kg (borne basse)
  maxRatio: number    // g de protéines par kg (borne haute)
}

// Les paramètres saisis par l'utilisateur

export type Parametres = {
  objectifsSelectionnes: ObjectifId[]
  poidsMin: number
  poidsMax: number
  nombreLignes: number
}