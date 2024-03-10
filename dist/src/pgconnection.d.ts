declare let client: any;
declare function pgConnect(): Promise<String>;
export { client, pgConnect };
