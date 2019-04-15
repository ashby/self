interface Part {
    anger: Array<string>
    selfPity: Array<string>
} 

declare class Self {
    route: string
    brain: Part
    face: Part
    mouth: Part
    heart: Part
    sternum: Part
    gut: Part
    skin: Part
    seeParts: Function
    public handleResentment: Function
    public handleAnger: Function
    accessAnger: Function
    createAnger: Function
    increaseAnger: Function
    removeAnger: Function
    public handleSelfPity: Function
    accessSelfPity: Function
    createSelfPity: Function
    increaseSelfPity: Function
    removeSelfPity: Function
}

interface Shield {
    armor: Array<string>
} 

declare class Smith extends Self {
    silence: Shield
    denial: Shield
    sarcasm: Shield
    confusion: Shield
    seeShields: Function
    public handleArmor: Function
    accessArmor: Function
    createArmor: Function
    increaseArmor: Function
    removeArmor: Function
}

interface Construct {
    boundary: Array<string>
}

declare class Guardian extends Smith {
    gate: Construct
    wall: Construct
    tower: Construct
    seeConstructs: Function
    public buildBoundary: Function
    public handleBoundary: Function
    accessBoundary: Function
    createBoundary: Function
    increaseBoundary: Function
    removeBoundary: Function        
}

interface Oath {
    loyalty: Array<string>
    honor: Array<string>
}

declare class Paladin extends Congrerant {
    pledge: Oath
    campaign: Oath
    crusade: Oath
    seeOaths: Function
    public handleLoyalty: Function
    accessLoyalty: Function
    createLoyalty: Function
    increaseLoyalty: Function
    removeLoyalty: Function
    accessHoner: Function
    createHonor: Function
    increaseHonor: Function
    removeHonor: Function
}

declare class Summoner extends Self {
    public summonGuard: Function
    public dismissGuard: Function
}

interface Virtue {
    vulnerability: Array<string>
    acceptance: Array<string>
}

declare class Seeker extends Summoner {
    soul: Virtue
    love: Virtue
    mind: Virtue
    seeVirtues: Function
    private handleVulnerability: Function
    private handleAcceptance: Function
    accessVulnerability: Function
    createVulnerability: Function
    increaseVulnerability: Function
    removeVulnerability: Function
    accessAcceptance: Function
    createAcceptance: Function
    increaseAcceptance: Function
    removeAcceptance: Function          
}

declare class Congrerant extends Summoner {
    public dubKnight: Function
    public debaseKnight: Function
}

interface Act {
    courage: Array<string>
    compassion: Array<string>
}

declare class Volunteer extends Congrerant {
    service: Act
    support: Act
    sacrifice: Act
    seeActs: Function
    public handleCourage: Function
    accessCourage: Function
    createCourage: Function
    increaseCourage: Function
    removeCourage: Function
    public handleCompassion: Function
    accessCompassion: Function
    createCompassion: Function
    increaseCompassion: Function
    removeCompassion: Function
}

interface Affliction {
    trauma: Array<string>
    toxicity: Array<string>
}

declare class Victim extends Volunteer {
    scar: Affliction
    gash: Affliction
    infection: Affliction
    tremor: Affliction
    nightmare: Affliction
    delirium: Affliction
    public seeAfflictions: Function
    public handleTrauma: Function
    accessTrauma: Function
    createTrauma: Function
    increaseTrauma: Function
    removeTrauma: Function
    public handleToxicity: Function
    accessToxicity: Function
    createToxicity: Function
    increaseToxicity: Function
    removeToxicity: Function
}

interface Stigmata {
    suffering: Array<string>
}

declare class Martyr extends Victim {
    nail: Stigmata
    crown: Stigmata
    cross: Stigmata
    public seeStigmatas: Function
    public handleSuffering: Function
    accessSuffering: Function
    createSuffering: Function
    increaseSuffering: Function
    removeSuffering: Function
}
