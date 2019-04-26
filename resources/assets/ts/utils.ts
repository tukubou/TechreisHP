// ############################
// Util関数軍
// ############################
export default function (){
    return 'f';
}
export function f1(){
    return 'f1';
}
/**
 * // 返り値や引数の型注釈も書ける
    (引数: 型): 型 => {関数本体}
 */
// export default foo = (): string => {}
export const getSizeType = (): string => {
    var w = window.innerWidth;
    //var win_height = window.innerHeight;
    return w <= 768 ? "sm" : w <= 991 ? "md" : w <= 1199 ? "lg" : "xs";
}
export const getParentSize = (): any => {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}