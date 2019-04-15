type GetGuardian = Function
type RemoveGuardian = Function
type GetPaladin = Function
type RemovePaladin = Function

interface Window {
    Guard: Guardian
    getGuardian: GetGuardian
    removeGuardian: RemoveGuardian
    Knight: Paladin
    getKnight: GetPaladin
    removeKnight: RemovePaladin
}

declare module NodeJS {
    interface Global {
        Guard: Guardian
        getGuardian: GetGuardian
        removeGuardian: RemoveGuardian
        Knight: Paladin
        getPaladin: GetPaladin
        removePaladin: RemovePaladin
    }
}

declare const Guard: Guardian;
declare const getGuardian: GetGuardian;
declare const removeGuardian: RemoveGuardian;
declare const Knight: Paladin;
declare const getPaladin: GetPaladin;
declare const removePaladin: RemovePaladin;