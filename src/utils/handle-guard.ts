import Guardian from "src/classes/Guardian";

global.getGuardian = () => {
    global.Guard = new Guardian();
}
global.removeGuardian = () => {
    delete global.Guard;
}