import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ] 
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        // Router é necessario para conseguir enviar o usuario para a tela de login caso o cadastro seja realizado com sucesso
        private router: Router,
        private platformDetectorService: PlatformDetectorService) {}

    ngOnInit(): void {
        this.platformDetectorService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus();
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    // Validator vc utiliza os validators padrão do angular
                    Validators.required,
                    // a forma abaixo você chama seu validators
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                // Validadores assincronoos nao podem ser colocados junto com os validadores sincronos
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });
    }

    signup() {
        // existem duas formas de obter valores do formulario, quando e poucos dados uma forma é usar igual ao utilizamos no signin
        // ex: const userName = this.loginForm.get('userName').value;

        // a forma abaixo é ideal quando precisamos obter muitos dados, pois você transforma os valores utilizando uma interface
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signUpService
        .signup(newUser)
        .subscribe(
            // Se não retorar erro redireciona o usuario para tela de login
            () => this.router.navigate(['']),
            err => console.log(err)
        );

    }
}