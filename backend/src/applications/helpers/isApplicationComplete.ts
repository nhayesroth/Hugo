import { Application } from "../Types/Application";
import { isApplicationValid } from "./isApplicationValid";

export function isApplicationComplete(application: Application) {
    return isApplicationValid(application)
        && application.dob.trim() !== ''
        && hasAtLeastOneVehicle(application);
}

function hasAtLeastOneVehicle(application: Application) {
    throw new Error("Function not implemented.");
}
