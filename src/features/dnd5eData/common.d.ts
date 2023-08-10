
interface APIResource {
    index: BaseData['index']
    name: BaseData['name']
    url: BaseData['url']
}

interface BaseData {
    name: string
    index: string | number
    url: string
}

// common types

type CreatureSize = 'Fine' | 'Diminutive' | 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan' | 'Colossal'

// common interfaces

interface AbilityBonus extends APIResource {
    bonus: number
}

interface Choice {
    desc: string
    choose: number
    type: string
    from: ChoiceFrom
    spell_options: Choice
}

interface ChoiceFrom {
    option_set_type: 'options_array' | 'equipment_category' | 'resource_list'
    equipment_category: APIResource
    resource_list: string
    options: ChoiceOptions[]
}

interface ChoiceOptions {
    option_type: string
    item: APIResource
    action_name: string
    count: number
    type: 'melee' | 'ranged' | 'abilty' | 'magic'
    // items:
    choice: Choice
    string: string
    desc: string
    alignments: APIResource[]
    of: APIResource
    ability_score: APIResource
    minimum_score: number
    bonus: number
    name: string
    dc: {
        dc_type: APIResource
        dc_value: number
        success_type: string
    }
    damage: {
        damage_dice: string
        damage_type: APIResource
    }[]
}

interface SpellCastingInfo {
    name: string
    desc: string[]
}

interface EquipmentStack {
    equipment: APIResource
    quantity: number
}

// dragonborn breath weapon sub-choices

// interface SubChoice extends Choice{
//     'damage-type': APIResource
//     'breath-weapon': {
//         name: string
//         desc: string
//         'area-of-effect': {
//             size: number
//             type: 'sphere' | 'cone' | 'cylinder' | 'line' | 'cube'
//         }
//         damage: {
//             damage_at_character_level: {
//                 [key: any]: string
//             }
//             damage_type: APIReference
//             dc: {
//                 dc_type: APIReference
//                 dc_value: number
//                 success_type: string

//             }
//             usage: {
//                 times: number
//                 type: string
//             }
//         }
//     }
// }