import type { Application, ApplicationCreate, ApplicationUpdate } from "../types/application";

const BASE_URL = "http://localhost:3001/applications";

async function handle<T>(res: Response, errorMsg: string): Promise<T> {
    if(!res.ok){
        const text = await res.text().catch(() => "");
        throw new Error(`${errorMsg} (${res.status}) ${text || res.statusText}`);
    }
    if(res.status === 204) return null as unknown as T;
    return (await res.json()) as T;
}

export async function getApplications(): Promise<Application[]>{
    const res = await fetch(BASE_URL);
    return handle<Application[]>(res, "Failed to fetch applications");
}

export async function getApplicationById(id: number): Promise<Application>{
    const res = await fetch(`${BASE_URL}/${id}`);
    return handle<Application>(res, "Failed to fetch application");
}

export async function createApplication(payload: ApplicationCreate): Promise<Application>{
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    console.log("CREATE payload:", payload);
    return handle<Application>(res, "Failed to create application");
}

export async function updateApplication(id: number, updates: ApplicationUpdate): Promise<Application>{
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
    });
    return handle<Application>(res, "Failed to update application");
}

export async function deleteApplication(id: number): Promise<boolean> {
    const res = await fetch(`${BASE_URL}/${id}`, {method: "DELETE"});
    await handle<unknown>(res, "Failed to delete application");
    return true;
}