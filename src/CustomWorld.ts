import { IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber"
import { WebDriver } from "selenium-webdriver"
import DriverUtil from "./DriverUtil"

export default interface CustomWorld extends World{
    driver: WebDriver
    driverUtil: DriverUtil
    count: number
    eat: (count: number) => void
}
  
setWorldConstructor(function(this: CustomWorld, options: IWorldOptions) {
    this.eat = (count) => this.count += count
})