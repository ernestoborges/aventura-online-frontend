export interface ITrait extends BaseData {
    index: string
    name: string
    races: APIResource[]
    subraces: APIResource[]
    desc: string[]
    proficiencies: APIResource[]
    proficiency_choices?: Choice
    language_options?: Choice
    trait_specific?: Choice

}
