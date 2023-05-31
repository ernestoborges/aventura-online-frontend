
export interface ISubrace extends BaseData {
    race: APIResource
    desc: string
    ability_bonuses: AbilityBonus[]
    ability_bonus_options?: Choice
    starting_proficiencies: APIResource[]
    starting_proficiency_options?: Choice
    languages: APIResource[]
    languages_options?: Choice
    racial_traits: APIResource[]
    racial_trait_options: Choice
  }