import Paladin from "src/classes/Paladin";

global.getPaladin = () => {
    global.Knight = new Paladin();
}
global.removePaladin = () => {
    delete global.Knight;
}