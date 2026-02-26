export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Application {
    id: number; 
    company: string;
    position: string;
    status: ApplicationStatus;
    location?: string;
    dateApplied?: string; //"yyyy-mm-dd"
    notes?: string;
    link?: string;
}

export type ApplicationCreate = Omit<Application, "id">;

export type ApplicationUpdate = Partial<ApplicationCreate>;