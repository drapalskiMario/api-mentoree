declare enum Seniority {
    Junior = "Junior",
    Pleno = "Pleno",
    Sênior = "S\u00EAnior"
}
declare enum Specialties {
    Desing = "Desing",
    DesenvolvimentoDeSoftware = "Desenvolvimento de Software",
    Marketing = "Marketing",
    Vendas = "Vendas"
}
export declare class CreateUserDto {
    name: string;
    email: string;
    linkedIn: string;
    password: string;
    isMentor: boolean;
    about: string;
    workplace: string;
    job: string;
    specialties: Specialties;
    seniority: Seniority;
    skillsOrInterests: string[];
}
export {};
