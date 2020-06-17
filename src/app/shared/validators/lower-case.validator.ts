import { AbstractControl } from '@angular/forms';

// Validators são sempre função que implementa o abstract control do angular Form
export function lowerCaseValidator(control: AbstractControl) {

    // Devolve algum erro se estiver vazio ou se o test mostrar que o valor nao bate com a expressao regular definida
    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true }
    }
    return null;
}





