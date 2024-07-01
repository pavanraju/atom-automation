import { Browser, Capabilities } from "selenium-webdriver";

export class AppConfig {

    private pageLoadTimeOut: number = 60000;
    private waitTimeOut: number = 60000;
    private implicitWaitTimeout: number = 5000;

    public getWaitTimeOut(): number{
        return this.waitTimeOut;
    }

    public getImplicitWaitTimeout(): number {
        if (process.env.implicitWaitTimeout != undefined && process.env.implicitWaitTimeout != "") {
            return parseInt(process.env.implicitWaitTimeout);
        } else {
            return this.implicitWaitTimeout;
        }
    }

    public getCapabilities(browserName: string): Capabilities{
        if(browserName == Browser.CHROME){
            const cap = Capabilities.chrome();
            cap.setAcceptInsecureCerts(true);
            cap.set('goog:chromeOptions', 
                { 
                    'args': [ "disable-infobars", "--start-maximized"],
                    'excludeSwitches': ['enable-automation'],
                    prefs: {
                        credentials_enable_service: false,
                        password_manager_enabled: false,
                        'profile.default_content_setting_values.autofill': 2,
                        'profile.default_content_settings.popups': 0
                      }
                }
            );
            return cap;
        } else if(browserName == Browser.FIREFOX) {
            const cap = Capabilities.firefox();
            cap.setAcceptInsecureCerts(true);
            cap.set('moz:firefoxOptions',
                {
                    args: ['--safe-mode']
                }
            );
            return cap;
        } else if(browserName == Browser.EDGE) {
            const cap = Capabilities.edge();
            cap.setAcceptInsecureCerts(true);
            return cap;
        }else{
            return Capabilities.chrome();
        }
        
       
    }

}