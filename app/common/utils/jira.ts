export const getJiraIssueFromString = (str: string) => {
    const regex = /([A-Za-z]+-[0-9]+)/g;
    const matches = str.match(regex);
    if (matches) {
        return matches[0];
    }
    return undefined;
};

export const stringIsJiraIssue = (str: string) => {
    return getJiraIssueFromString(str) === str;
}
