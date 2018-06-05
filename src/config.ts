

export class Config {

    private defaultConfig: object;

    private userConfig: object;

    private config: object;

    constructor(defaultConfig: object, userConfig?: object) {
        this.defaultConfig = defaultConfig;
        this.userConfig = userConfig;
        this.config = this.extend({}, defaultConfig, userConfig);
    }

    public getConfig(): object {
        return this.config;
    }

    public get(key: string, defaultValue?: any): any {
        let result = this.config[key];

        if (result)
            return result;
        else
            return defaultValue ? defaultValue : false;
    }

    private extend(...args: Object[]): any {
        for(let i=1; i<args.length; i++)
            for(let key in args[i])
                if(args[i].hasOwnProperty(key)) {
                    if (Config.is_dictionary(args[i][key]))
                        args[0][key] = this.extend(args[0][key], args[i][key]);
                    else
                        args[0][key] = args[i][key];
                }
        return args[0];
    }

    public static is_dictionary(variable: any): boolean {
        return typeof variable === 'object' && variable!==null && !(variable instanceof Array) && !(variable instanceof Date)
    }

}