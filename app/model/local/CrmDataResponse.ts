export type CrmDataResponse = {
    messageId: string;
    organizationNumber: string;
    agreementNumber: string;
    bankCode: string;
    customerNumber: string;
    customerName: string;
    contactPersonName: string;
    contactPersonPhone: string;
    contactPersonEmail: string;
    message: string;
    createdTime: Date;
    status: [
        {
            status: string;
            modifiedTime?: Date;
            createdTime: Date;
        }
    ];
};