export interface Checkpoint {
    id: string;
    nome: string;
    coordinate: string; //es. "40.714728,-73.998672"
    orarioPassaggioPrevisto?: Date;
    orarioPassaggioEffettivo?: Date;
    orarioArrivoPrevisto?: Date;
    orarioArrivoEffettivo?: Date;
    orarioPartenzaPrevisto?: Date;
    orarioPartenzaEffettivo?: Date;
}