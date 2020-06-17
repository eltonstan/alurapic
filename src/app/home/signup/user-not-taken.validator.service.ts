import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { switchMap, debounceTime, map, first } from 'rxjs/operators';

// Esse validador não é function pois funcionar nao consegue realizar injeção de dependencia para usar um service
// sendo um serviço conseguimos consumir um outro serviço e com podemos criar um metodo que retorna uma função de validação
@Injectable({ providedIn: 'root'})
export class UserNotTakenValidatorService {

    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        return (control: AbstractControl) => {
            return control
                .valueChanges
                // o debounceTime faz que o sistema sistema espere X milisegundos apos a letra ser digitada para evitar que seja realizada uma busca
                // a cada caractere pressionado
                .pipe(debounceTime(300))
                .pipe(switchMap(userName => 
                    this.signUpService.checkUserNameTaken(userName)
                ))
                // aqui que volta o nome que vc vai usar o validator no html quando ocorrer o erro
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first());
        }
    }
}