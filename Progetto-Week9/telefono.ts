interface Smartphone {
    credito: number;
    numeroChiamate: number;

    ricarica(ricarica: number): void;
    chiamata(durata: number): void;
    numero404(): number;
    getNumeroChiamate(): number;
    azzeraChiamate(): void;
}

class Telefono implements Smartphone {
    public credito: number;
    public numeroChiamate: number;
    constructor(_credito: number, _numeroChiamate: number) {
        this.credito = _credito;
        this.numeroChiamate = _numeroChiamate;
    }

    public ricarica(ricarica: number): void {
        this.credito += ricarica;
    }

    public chiamata(durataChiamata: number): void {
        let costoChiamata: number = durataChiamata * 0.2;

        if (this.credito >= costoChiamata) {
            this.credito -= costoChiamata;
            this.numeroChiamate++;
        } else {
            console.log('Credito insufficiente, la chiamata non può essere effettuata');
        }
    }

    public numero404(): number {
        return Math.round(this.credito * 100) / 100;
    }

    public getNumeroChiamate(): number {
        return this.numeroChiamate;
    }

    public azzeraChiamate(): void {
        this.numeroChiamate = 0;
    }
}

function printData(utente: Telefono): void {
    console.log(`Credito residuo: ${utente.numero404()}`);
    console.log(`Numero chiamate: ${utente.getNumeroChiamate()}`);
    utente.azzeraChiamate();
    console.log(`Chiamate azzerate: ${utente.numeroChiamate}`);
}

var primoUtente = new Telefono(10, 0);
console.log('-----Primo utente-----');
primoUtente.ricarica(20);
primoUtente.chiamata(5);
primoUtente.ricarica(5);
primoUtente.chiamata(10);
printData(primoUtente);

var secondoUtente = new Telefono(15, 0);
console.log('-----Secondo utente-----');
secondoUtente.ricarica(5);
secondoUtente.chiamata(10);
secondoUtente.ricarica(10);
secondoUtente.chiamata(2);
printData(secondoUtente);

var terzoUtente = new Telefono(20, 0);
console.log('-----Terzo utente-----');
terzoUtente.ricarica(10);
terzoUtente.chiamata(2);
terzoUtente.ricarica(10);
terzoUtente.chiamata(2);
printData(terzoUtente);


/* ------------------------------------------ AGGIUNTE ------------------------------------------ */

var scelta = document.getElementById('scelta') as HTMLDivElement;
var ricariche = document.getElementById('ricariche') as HTMLDivElement;
var chiamate = document.getElementById('chiamate') as HTMLDivElement;

var tel = document.getElementById('tel') as HTMLInputElement;
var importoRicarica = document.getElementById('importoRicarica') as HTMLInputElement;
var avvisoRicarica = document.getElementById('avvisoRicarica') as HTMLParagraphElement;

var tel2 = document.getElementById('tel2') as HTMLInputElement;
var avvisoChiamata = document.getElementById('avvisoChiamata') as HTMLParagraphElement;
var numeroChiamate = document.getElementById('numeroChiamate') as HTMLParagraphElement;

var creditoResiduo = document.getElementById('creditoResiduo') as HTMLParagraphElement;

var btnChiamate = document.getElementById('btnChiamate') as HTMLButtonElement;

var utenteIndex = new Telefono(0, 0);


document.addEventListener('DOMContentLoaded', init);

function init(): void {
    scelta.style.display = 'block';
    chiamate.style.display = 'none';
    ricariche.style.display = 'none';
    creditoResiduo.style.display = 'block';
}

// Visualizzazione schermata
document.getElementById('btnRicarichePag')!.addEventListener('click', function() {
    scelta.style.display = 'none';
    chiamate.style.display = 'none';
    ricariche.style.display = 'block';
});

document.getElementById('btnChiamatePag')!.addEventListener('click', function() {
    scelta.style.display = 'none';
    chiamate.style.display = 'block';
    ricariche.style.display = 'none';
});

// Funzione per fare una ricarica
document.getElementById('btnRicariche')!.addEventListener('click', function() {
    btnChiamate.removeAttribute('disabled');
    if (tel.value != '' && importoRicarica.value != '') {
        avvisoRicarica.classList.remove('text-danger');
        avvisoRicarica.innerHTML = 'Ricarica effettuata!';
        creditoResiduo.style.display = 'block';
        utenteIndex.ricarica(calcoloImportoRicarica());
        creditoResiduo.innerHTML = `Il tuo credito è: &euro; ${utenteIndex.numero404()}`;
        clearForm()
    } else {
        avvisoRicarica.classList.add('text-danger');
        avvisoRicarica.innerHTML = 'Compilare correttamente tutti i campi!';
    }
});

// Funzione che calcola l'importo della ricarica
function calcoloImportoRicarica(): number {
    switch(importoRicarica.value) {
        case '5':
            return 5;
        case '10':
            return 10;
        case '15':
            return 15;
        case '20':
            return 20;
        case '30':
            return 30;
        case '40':
            return 40;
        case '50':
            return 50;
        default:
            return 5;
    }
}

// Funzione per fare una chiamata
btnChiamate.addEventListener('click', function() {
    btnChiamate.removeAttribute('disabled');
    if (tel2.value != '') {
        let durataChiamata = Math.round(Math.random() * 100);
        avvisoChiamata.classList.remove('text-danger');
        avvisoChiamata.innerHTML = 'Chiamata effettuata!';

        utenteIndex.chiamata(durataChiamata);

        if (durataChiamata * 0.2 > utenteIndex.credito) {
            btnChiamate.setAttribute('disabled', '');
            avvisoChiamata.classList.add('text-danger');
            avvisoChiamata.innerHTML = 'Credito insufficiente, la chiamata non può essere effettuata';
        }

        numeroChiamate.innerHTML = `Numero chiamate effettuate: ${utenteIndex.getNumeroChiamate()}`;
        
        creditoResiduo.style.display = 'block';
        creditoResiduo.innerHTML = `Il tuo credito è: &euro; ${utenteIndex.numero404()}`;
    } else {
        avvisoChiamata.classList.add('text-danger');
        avvisoChiamata.innerHTML = 'Compilare correttamente tutti i campi!';
    }
});

// Azzerare il numero delle chiamate
document.getElementById('azzeraChiamate')!.addEventListener('click', function() {
    utenteIndex.azzeraChiamate();
    numeroChiamate.innerHTML = `Numero chiamate effettuate: ${utenteIndex.getNumeroChiamate()}`;
});

// Funziona svuota form
function clearForm(): void {
    importoRicarica.value = '';
    avvisoRicarica.innerHTML = '';
    avvisoChiamata.innerHTML = '';
}