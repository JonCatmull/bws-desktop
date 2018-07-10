export class Util {

    stripHTML(markup: string): string {
        return markup.replace(/<\/?[^>]+(>|$)/g, "");
    }
}
