// export class Util {

//     stripHTML(markup: string): string {
//         return markup.replace(/<\/?[^>]+(>|$)/g, "");
//     }

//     toDatetimeLocal(date: Date) {
//         var
//         ten = function (i) {
//             return (i < 10 ? '0' : '') + i;
//         },
//         YYYY = date.getFullYear(),
//         MM = ten(date.getMonth() + 1),
//         DD = ten(date.getDate()),
//         HH = ten(date.getHours()),
//         II = ten(date.getMinutes()),
//         SS = ten(date.getSeconds())
//         ;
//         return YYYY + '-' + MM + '-' + DD + 'T' +
//                 HH + ':' + II + ':' + SS;
//     };

// }


export const stripHTML = (markup: string) => {
    return markup.replace(/<\/?[^>]+(>|$)/g, "");
};

export const toDatetimeLocal = (date: Date) => {
    var
    ten = function (i) {
        return (i < 10 ? '0' : '') + i;
    },
    YYYY = date.getFullYear(),
    MM = ten(date.getMonth() + 1),
    DD = ten(date.getDate()),
    HH = ten(date.getHours()),
    II = ten(date.getMinutes()),
    SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
            HH + ':' + II + ':' + SS;
};
