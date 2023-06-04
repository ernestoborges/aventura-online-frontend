import { IProficiency } from "./Proficiency"

export interface IRace extends BaseData {
    name: string
    speed: number
    ability_bonuses: AbilityBonus[]
    ability_bonus_options: Choice
    alignment: string
    age: string
    size: CreatureSize
    size_description: string
    starting_proficiencies: IProficiency[]
    starting_proficiency_options?: Choice
    languages: APIResource[]
    language_options?: Choice
    language_desc: string
    traits: APIResource[]
    subraces: APIResource[]
}