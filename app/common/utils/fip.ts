export const fipMap = {
    "FIP-01": { onPrem: "http://fip-01.mesh.internal", aws: "http://fip-01.mesh.internal" },
    AT: { onPrem: "http://fip.mesh.internal", aws: "http://fip.mesh.internal" },
} as const;

export type Fip = keyof typeof fipMap;

export const getFipLabelByUrl = (url: string): Fip | undefined => {
    const fip = Object.entries(fipMap).find(([, fipUrls]) => fipUrls.onPrem === url || fipUrls.aws === url);

    const fipLabel = fip?.[0];

    if (!fipLabel) {
        return undefined;
    }

    if (stringIsFip(fipLabel)) {
        return fipLabel;
    }
};

const stringIsFip = (fip: string): fip is Fip => {
    const fipKeys = Object.keys(fipMap);
    if (fipKeys.includes(fip)) {
        return true;
    }
    return false;
};
