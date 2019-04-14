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
    getAnger: Function
    createAnger: Function
    updateAnger: Function
    removeAnger: Function
    public handleSelfPity: Function
    getSelfPity: Function
    createSelfPity: Function
    updateSelfPity: Function
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
    getArmor: Function
    createArmor: Function
    updateArmor: Function
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
    getBoundary: Function
    createBoundary: Function
    updateBoundary: Function
    removeBoundary: Function        
}

declare class Summoner extends Self {
    public summonGuard: Function
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
    getVulnerability: Function
    createVulnerability: Function
    updateVulnerability: Function
    removeVulnerability: Function
    getAcceptance: Function
    createAcceptance: Function
    updateAcceptance: Function
    removeAcceptance: Function          
}