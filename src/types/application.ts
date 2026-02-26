 /* ApplicationStatus is A string literal union type. meaning the value can ONLY be one of these exact strings.*/
export type ApplicationStatus = "Applied" | "Interview" | "Offer" | "Rejected";

/* Application represents a full application object as store in a database. */
/* The ? suggest the field may or may not exist. */
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

/* The ApplicationCreate create this object structure but omits the Id (remove). */
export type ApplicationCreate = Omit<Application, "id">;

/* The ApplicationUpdate updates a object values partially. */
export type ApplicationUpdate = Partial<ApplicationCreate>;