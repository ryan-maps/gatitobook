import { AbstractControl, ValidationErrors } from "@angular/forms";

export function minusculoValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value as string;
    if(valor !== valor.toLowerCase()){
        return { minusculo: true }
    }
    return null;
}