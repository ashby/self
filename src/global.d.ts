// import 'src/classes/interfaces';

type GetGuardian = Function
type RemoveGuardian = Function

interface Window {
    Guard: Guardian
    getGuardian: GetGuardian
    removeGuardian: RemoveGuardian
}

declare module NodeJS {
    interface Global {
        Guard: Guardian
        getGuardian: GetGuardian
        removeGuardian: RemoveGuardian
    }
}

declare const Guard: Guardian;
declare const getGuardian: GetGuardian;
declare const removeGuardian: RemoveGuardian