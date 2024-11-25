export function creerClasseDynamique(propOuMeth: any): any {
    return new Proxy (propOuMeth, {
        get(t, p) {
            if(p in propOuMeth)
                return propOuMeth[p].bind(t); // on retourne la méthode
            return t[p]; // on retourne pa propriété
        },
        set(t, p, val) {
            t[p] = val;
            return true; // Pour terminer le set
        }
    });
}