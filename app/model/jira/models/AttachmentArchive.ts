/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AttachmentArchiveEntry } from "./AttachmentArchiveEntry";

export type AttachmentArchive = {
    entries?: Array<AttachmentArchiveEntry>;
    moreAvailable?: boolean;
    totalEntryCount?: number;
    totalNumberOfEntriesAvailable?: number;
};
