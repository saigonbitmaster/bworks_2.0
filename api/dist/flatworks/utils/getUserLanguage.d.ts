declare const project_id: string;
declare const blockfrost_url: string;
declare const axios: any;
declare function checkWallet(address: any, value: any): Promise<{
    amount: number;
    isEnough: boolean;
}>;
