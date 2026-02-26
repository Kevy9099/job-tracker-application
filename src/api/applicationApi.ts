/**
 * This applicationApi file handles all communication betwee the React app and db.json server. 
 * 
 * Each export async function will: 
 * 1. Make a HTTP request (fetch)
 * 2. Waits for the response
 * 3. Passes it to handle() for error handling 
 * 4. Returns typed data
 * 
 * Important Definitions
 * @import Inferfaces Application, ApplicationCreate and ApplicationUpdate from src/types/application.ts
 * @async This means the function returns a Promise.
 * @Promise <Application[]>: This mean the function will eventually return an array of Application objects.
 * @await fetch(BASE_URL): This will send a GET request automatically (GET is default).
 * @handle <Application[]>: This will check for errors, convert reponse to JSON and casts it to Application[].
 * 
 *  */
import type { Application, ApplicationCreate, ApplicationUpdate } from "../types/application";

// BASE_URL is located at https://localhost:3001 and gets ALL applications from applications[] array.
const BASE_URL = "http://localhost:3001/applications";

async function handle<T>(res: Response, errorMsg: string): Promise<T> {
    if(!res.ok){
        const text = await res.text().catch(() => "");
        throw new Error(`${errorMsg} (${res.status}) ${text || res.statusText}`);
    }
    if(res.status === 204) return null as unknown as T;
    return (await res.json()) as T;
}

// The async function will get ALL applications from Application[]
export async function getApplications(): Promise<Application[]>{
    const res = await fetch(BASE_URL);
    return handle<Application[]>(res, "Failed to fetch applications");
}

// The async function will get Applications by Id. (must be a number).
export async function getApplicationById(id: number): Promise<Application>{
    const res = await fetch(`${BASE_URL}/${id}`);
    return handle<Application>(res, "Failed to fetch application");
}

// The async functionw will Create Applications by the payload.
// The payload is the interface object that is being called from application.ts file. 
// this will exculde the ID using the method "POST".
export async function createApplication(payload: ApplicationCreate): Promise<Application>{
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    console.log("CREATE payload:", payload);
    return handle<Application>(res, "Failed to create application");
}

// the async function will update an application by its Id.
export async function updateApplication(id: number, updates: ApplicationUpdate): Promise<Application>{
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    return handle<Application>(res, "Failed to update application");
}

// the async function will delete an application (permanently) by its Id.
export async function deleteApplication(id: number): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${id}`, {method: "DELETE"});
    await handle<unknown>(res, "Failed to delete application");
    return true;
}