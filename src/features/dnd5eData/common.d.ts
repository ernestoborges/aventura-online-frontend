
interface APIResource {
    index: BaseData['index']
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
    choose: number
    type: string
    from: any[] | APIResource
}