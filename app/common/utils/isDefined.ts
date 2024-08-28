export const isDefined = <T>(element: T | null | undefined): element is T => {
    if (element === null) {
        return false;
    }

    if (element === undefined) {
        return false;
    }

    return true;
};
