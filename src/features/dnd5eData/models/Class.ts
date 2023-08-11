export interface IClass extends BaseData {
    hit_die: number
    proficiencies: APIResource[]
    proficiency_choices: Choice[]
    saving_throws: APIResource[]
    starting_equipment: APIResource
    class_levels: APIResource
    subclasses: APIResource[]
    spellcasting: APIResource
    feature_list?: Feature[]
}

export interface SpellCastingData extends BaseData {
    class: APIResource
    level: number
    spellcasting_ability: APIResource
    info: SpellCastingInfo[]
}

export interface StartingEquipmentData extends BaseData {
    class: APIResource
    starting_equipment: EquipmentStack[]
    starting_equipment_options: Choice[]
}